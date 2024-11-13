"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTonBalance = getTonBalance;
const _ = require("lodash");
const ton_access_1 = require("@orbs-network/ton-access");
const ton_1 = require("@ton/ton");
const core_1 = require("@ton/core");
const constants_js_1 = require("../../utils/constants.js");
const viem_1 = require("viem");
const sleep = async (time) => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time * 1000);
  });
};
async function getTonBalance(walletAddress, tokens) {
  const address = core_1.Address.parse(walletAddress);
  const tonClient = await (0, ton_access_1.getHttpEndpoint)().then(
    (endpoint) => {
      return new ton_1.TonClient({
        endpoint,
      });
    },
  );
  const res = [];
  for (let token of tokens) {
    if (token.address === constants_js_1.AddressZero) {
      const balance = await tonClient.getBalance(address);
      res.push(balance);
      await sleep(1);
      continue;
    }
    const JettonMasterAddress = core_1.Address.parse(token.address);
    const jettonMaster = tonClient.open(
      ton_1.JettonMaster.create(JettonMasterAddress),
    );
    const userTokenAddress = await jettonMaster.getWalletAddress(address);
    await sleep(1);
    const value = await tonClient
      .runMethod(userTokenAddress, "get_wallet_data")
      .then((result) => {
        const value = result.stack.pop();
        return value.value;
      })
      .catch((e) => {
        console.log(e, "error");
        return "0";
      });
    await sleep(1);
    res.push(BigInt(value));
  }
  return _.zipWith(tokens, res, (token, balance) => {
    return {
      ...token,
      amount: balance.toString(),
      formatted: (0, viem_1.formatUnits)(balance, token.decimals || 18),
    };
  });
}
//# sourceMappingURL=getTonBalance.js.map
