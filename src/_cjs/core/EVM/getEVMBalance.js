"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEVMBalance = void 0;
const viem_1 = require("viem");
const abi_js_1 = require("./abi.js");
const publicClient_js_1 = require("./publicClient.js");
const constants_js_1 = require("../../utils/constants.js");
const _ = require("lodash");
const getEVMBalance = async (walletAddress, tokens) => {
  if (tokens.length === 0) {
    return [];
  }
  const { chainId } = tokens[0];
  tokens.forEach((token) => {
    if (token.chainId !== chainId) {
      console.warn(`Requested tokens have to be on the same chain.`);
    }
  });
  const client = await (0, publicClient_js_1.getPublicClient)(Number(chainId));
  const res = await Promise.all(
    tokens.map((token) => {
      if (token.address === constants_js_1.AddressZero) {
        return client
          .getBalance({
            address: walletAddress,
          })
          .then((balance) => {
            return balance;
          });
      }
      return client.readContract({
        abi: abi_js_1.balanceOfAbi,
        address: token.address,
        args: [walletAddress],
        functionName: "balanceOf",
      });
    }),
  );
  return _.zipWith(tokens, res, (token, balance) => {
    return {
      amount: `${balance}`,
      formatted: (0, viem_1.formatUnits)(balance, token.decimals || 18),
      decimals: token.decimals || 18,
      symbol: token.symbol,
      address: token.address,
    };
  });
};
exports.getEVMBalance = getEVMBalance;
//# sourceMappingURL=getEVMBalance.js.map
