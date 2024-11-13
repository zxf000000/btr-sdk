"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHAIN_IDS =
  exports.TON_CHAINID =
  exports.TRON_CHAINID =
  exports.SOLANA_CHAINID =
  exports.NEAR_CHAINID =
    void 0;
const chain_js_1 = require("../types/chain.js");
exports.NEAR_CHAINID = "1360100178526209";
exports.SOLANA_CHAINID = "1360108768460801";
exports.TRON_CHAINID = "728126428";
exports.TON_CHAINID = "1360104473493505";
exports.CHAIN_IDS = {
  [chain_js_1.ChainType.NEAR]: exports.NEAR_CHAINID,
  [chain_js_1.ChainType.SOLANA]: exports.SOLANA_CHAINID,
  [chain_js_1.ChainType.TON]: exports.TON_CHAINID,
  [chain_js_1.ChainType.TRON]: exports.TRON_CHAINID,
  [chain_js_1.ChainType.EVM]: "1",
};
//# sourceMappingURL=chain.js.map
