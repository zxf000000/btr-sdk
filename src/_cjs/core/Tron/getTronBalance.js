"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTronBalance = exports.TRX_ADDRESS = void 0;
const getTronClient_js_1 = require("./getTronClient.js");
const abi_js_1 = require("./abi.js");
const _ = require("lodash");
const viem_1 = require("viem");
exports.TRX_ADDRESS = "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb";
const getTronBalance = async (walletAddress, tokens) => {
  if (!walletAddress) {
    return [];
  }
  const tronClient = (0, getTronClient_js_1.getTronClient)();
  const calls = tokens.map((token) => {
    if (token.address === exports.TRX_ADDRESS) {
      return tronClient.trx.getBalance(walletAddress);
    }
    const contract = tronClient.contract(abi_js_1.default, token.address);
    return contract.methods.balanceOf(walletAddress).call();
  });
  tronClient.setAddress(walletAddress);
  const balances = await Promise.all(calls);
  return _.zipWith(tokens, balances, (token, balance) => {
    return {
      amount: `${balance}`,
      formatted: (0, viem_1.formatUnits)(
        BigInt(balance || 0),
        token.decimals || 18,
      ),
      decimals: token.decimals || 18,
      symbol: token.symbol,
      address: token.address,
    };
  });
};
exports.getTronBalance = getTronBalance;
//# sourceMappingURL=getTronBalance.js.map
