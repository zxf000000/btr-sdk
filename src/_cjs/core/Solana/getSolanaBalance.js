"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSolanaBalance = void 0;
const web3_js_1 = require("@solana/web3.js");
const connection_js_1 = require("./connection.js");
const types_js_1 = require("./types.js");
const constants_js_1 = require("../../utils/constants.js");
const viem_1 = require("viem");
const getSolanaBalance = async (walletAddress, tokens) => {
  if (tokens.length === 0) {
    return [];
  }
  const { chainId } = tokens[0];
  tokens.forEach((token) => {
    if (token.chainId !== chainId) {
      console.warn(`Requested tokens have to be on the same chain.`);
    }
  });
  return getSolanaBalanceDefault(chainId, tokens, walletAddress);
};
exports.getSolanaBalance = getSolanaBalance;
const getSolanaBalanceDefault = async (_chainId, tokens, walletAddress) => {
  const connection = await (0, connection_js_1.getSolanaConnection)();
  const accountPublicKey = new web3_js_1.PublicKey(walletAddress);
  const tokenProgramPublicKey = new web3_js_1.PublicKey(
    types_js_1.TokenProgramAddress,
  );
  const [slot, balance, tokenAccountsByOwner] = await Promise.allSettled([
    connection.getSlot(),
    connection.getBalance(accountPublicKey),
    connection.getParsedTokenAccountsByOwner(accountPublicKey, {
      programId: tokenProgramPublicKey,
    }),
  ]);
  const blockNumber = slot.status === "fulfilled" ? BigInt(slot.value) : 0n;
  const solBalance =
    balance.status === "fulfilled" ? BigInt(balance.value) : 0n;
  const walletTokenAmounts =
    tokenAccountsByOwner.status === "fulfilled"
      ? tokenAccountsByOwner.value.value.reduce((tokenAmounts, value) => {
          const amount = BigInt(
            value.account.data.parsed.info.tokenAmount.amount,
          );
          if (amount > 0n) {
            tokenAmounts[value.account.data.parsed.info.mint] = amount;
          }
          return tokenAmounts;
        }, {})
      : {};
  walletTokenAmounts[constants_js_1.SolSystemProgram] = solBalance;
  return tokens.map((token) => {
    if (walletTokenAmounts[token.address]) {
      return {
        ...token,
        amount: String(walletTokenAmounts[token.address]),
        blockNumber,
        formatted: (0, viem_1.formatUnits)(
          walletTokenAmounts[token.address],
          token.decimals,
        ),
      };
    }
    return {
      ...token,
      blockNumber,
      formatted: (0, viem_1.formatUnits)(
        walletTokenAmounts[token.address],
        token.decimals,
      ),
      amount: "0",
    };
  });
};
//# sourceMappingURL=getSolanaBalance.js.map
