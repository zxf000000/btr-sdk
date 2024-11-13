"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTonProvider = createTonProvider;
const index_js_1 = require("../../types/index.js");
const isAddress_js_1 = require("./isAddress.js");
const sdk_1 = require("@tonconnect/sdk");
const getTonBalance_js_1 = require("./getTonBalance.js");
function createTonProvider(options) {
  const _options = options ?? {};
  return {
    providerType: index_js_1.ChainType.TON,
    isAddress: isAddress_js_1.isAddress,
    getBalance: getTonBalance_js_1.getTonBalance,
    async executeRoute(route) {
      if (!_options.getConnector) {
        throw new Error(`Connector is not provided.`);
      }
      const connector = await _options.getConnector();
      const hash = await connector.sendTransaction({
        network: sdk_1.CHAIN.MAINNET,
        validUntil: Math.floor(Date.now() / 1000) + 60,
        messages: [
          {
            address: route.to,
            amount: route.value,
            payload: route.data,
          },
        ],
      });
      return hash.boc;
    },
    setOptions(options) {
      Object.assign(_options, options);
    },
  };
}
//# sourceMappingURL=TON.js.map
