"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNearProvider = createNearProvider;
const index_js_1 = require("../../types/index.js");
const isAddress_js_1 = require("./isAddress.js");
const getNearBalance_js_1 = require("./getNearBalance.js");
function createNearProvider(options) {
  const _options = options ?? {};
  return {
    providerType: index_js_1.ChainType.NEAR,
    isAddress: isAddress_js_1.isAddress,
    getBalance: getNearBalance_js_1.getNearBalance,
    async executeRoute(route) {
      if (!_options.getWallet) {
        throw new Error(`Wallet is not provided.`);
      }
      const wallet = await _options.getWallet();
      const to = route[0].to;
      const actions = route.map((item) => {
        return {
          type: "FunctionCall",
          params: {
            methodName: item.method,
            args: JSON.parse(item.data),
            gas: "300000000000000",
            deposit: item.value || "0",
          },
        };
      });
      const result = await wallet.signAndSendTransaction({
        receiverId: to,
        actions: actions,
      });
      return result.transaction;
    },
    setOptions(options) {
      Object.assign(_options, options);
    },
  };
}
//# sourceMappingURL=Near.js.map
