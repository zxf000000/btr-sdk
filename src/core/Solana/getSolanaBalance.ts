import { PublicKey } from "@solana/web3.js";
import { getSolanaConnection } from "./connection.js";
import { TokenProgramAddress } from "./types.js";
import type { Token, TokenAmount } from "../../types/index.js";
import { SolSystemProgram } from "../../utils/constants.js";
import { formatUnits } from "viem";

export const getSolanaBalance = async (
  walletAddress: string,
  tokens: Token[],
): Promise<TokenAmount[]> => {
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

const getSolanaBalanceDefault = async (
  _chainId: string,
  tokens: Token[],
  walletAddress: string,
): Promise<TokenAmount[]> => {
  const connection = await getSolanaConnection();
  const accountPublicKey = new PublicKey(walletAddress);
  const tokenProgramPublicKey = new PublicKey(TokenProgramAddress);
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
      ? tokenAccountsByOwner.value.value.reduce(
          (tokenAmounts, value) => {
            const amount = BigInt(
              value.account.data.parsed.info.tokenAmount.amount,
            );
            if (amount > 0n) {
              tokenAmounts[value.account.data.parsed.info.mint] = amount;
            }
            return tokenAmounts;
          },
          {} as Record<string, bigint>,
        )
      : {};
  walletTokenAmounts[SolSystemProgram] = solBalance;
  return tokens.map((token) => {
    if (walletTokenAmounts[token.address]) {
      return {
        ...token,
        amount: String(walletTokenAmounts[token.address]),
        blockNumber,
        formatted: formatUnits(
          walletTokenAmounts[token.address],
          token.decimals,
        ),
      };
    }
    return {
      ...token,
      blockNumber,
      formatted: formatUnits(walletTokenAmounts[token.address], token.decimals),
      amount: "0",
    };
  });
};
