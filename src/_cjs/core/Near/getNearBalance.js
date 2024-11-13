"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNearBalance = getNearBalance;
const getNearConnection_js_1 = require("./getNearConnection.js");
const constants_js_1 = require("../../utils/constants.js");
const _ = require("lodash");
const viem_1 = require("viem");
async function getNearBalance(walletAddress, tokens) {
  if (!walletAddress) {
    return [];
  }
  const connection = await (0, getNearConnection_js_1.getNearConnection)();
  const account = await connection?.account(walletAddress);
  account.getAccountBalance().then((res) => res.available);
  const calls = tokens.map((token) => {
    if (token.address === constants_js_1.AddressZero) {
      return account.getAccountBalance().then((res) => res.available);
    }
    return account.viewFunction({
      contractId: token.address,
      methodName: "ft_balance_of",
      args: {
        account_id: walletAddress,
      },
    });
  });
  const balances = await Promise.all(calls);
  return _.zipWith(tokens, balances, (token, balance) => {
    return {
      amount: `${balance}`,
      formatted: (0, viem_1.formatUnits)(balance, token.decimals || 18),
      decimals: token.decimals || 18,
      symbol: token.symbol,
      address: token.address,
    };
  });
}
//# sourceMappingURL=getNearBalance.js.map
