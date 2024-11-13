"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../types/index.js");
const chain_js_1 = require("../macros/chain.js");
const chainIdToType = (chainId) => {
  let type = index_js_1.ChainType.EVM;
  Object.entries(chain_js_1.CHAIN_IDS).forEach(([key, value]) => {
    if (value === chainId) {
      type = key;
    }
  });
  return type;
};
exports.default = chainIdToType;
//# sourceMappingURL=chainIdToType.js.map
