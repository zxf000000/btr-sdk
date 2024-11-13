"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTronClient = void 0;
const tronweb_1 = require("tronweb");
const index_js_1 = require("../../config/index.js");
const index_js_2 = require("../../types/index.js");
const getTronClient = () => {
  const TronRpc =
    index_js_1.default.rpcs?.[index_js_2.ChainType.TRON]?.urls?.[0];
  const headers = index_js_1.default.rpcs?.[index_js_2.ChainType.TRON]?.headers;
  if (!TronRpc) {
    throw new Error("Please provide rpcs for Tron chain");
  }
  const HttpProvider = tronweb_1.providers.HttpProvider;
  const fullNode = new HttpProvider(TronRpc, undefined, undefined, undefined, {
    ...headers,
  });
  const solidityNode = new HttpProvider(
    TronRpc,
    undefined,
    undefined,
    undefined,
    {
      ...headers,
    },
  );
  const fullHost = new HttpProvider(TronRpc, undefined, undefined, undefined, {
    ...headers,
  });
  const eventServer = new HttpProvider(
    TronRpc,
    undefined,
    undefined,
    undefined,
    {
      ...headers,
    },
  );
  return new tronweb_1.TronWeb({
    fullNode,
    solidityNode,
    fullHost,
    eventServer,
  });
};
exports.getTronClient = getTronClient;
//# sourceMappingURL=getTronClient.js.map
