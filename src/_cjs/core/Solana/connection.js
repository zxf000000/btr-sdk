"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSolanaConnection = void 0;
const web3_js_1 = require("@solana/web3.js");
const index_js_1 = require("../../config/index.js");
const index_js_2 = require("../../types/index.js");
let connection = undefined;
const getSolanaConnection = async () => {
  if (!connection) {
    const rpcUrl = index_js_1.default.rpcs?.[index_js_2.ChainType.SOLANA]?.[0];
    if (!rpcUrl) {
      throw new Error("Please config rpc for Solana");
    }
    connection = new web3_js_1.Connection(rpcUrl);
    return connection;
  } else {
    return connection;
  }
};
exports.getSolanaConnection = getSolanaConnection;
//# sourceMappingURL=connection.js.map
