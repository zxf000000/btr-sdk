"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNearConnection = getNearConnection;
const near_api_js_1 = require("near-api-js");
const index_js_1 = require("../../config/index.js");
const index_js_2 = require("../../types/index.js");
async function getNearConnection() {
  return await (0, near_api_js_1.connect)({
    networkId: "mainnet",
    nodeUrl:
      index_js_1.default.rpcs?.[index_js_2.ChainType.NEAR]?.[0] ||
      "https://rpc.mainnet.near.org",
    walletUrl: "https://mainnet.mynearwallet.com/",
    helperUrl: "https://helper.mainnet.near.org",
    keyStore: new near_api_js_1.keyStores.BrowserLocalStorageKeyStore(),
  });
}
//# sourceMappingURL=getNearConnection.js.map
