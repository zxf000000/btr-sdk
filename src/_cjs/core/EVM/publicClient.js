"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicClient = void 0;
const viem_1 = require("viem");
const index_js_1 = require("../../config/index.js");
const macros_js_1 = require("./macros.js");
const publicClients = {};
const getPublicClient = async (chainId) => {
  const _chain = await index_js_1.default.getChainById(chainId);
  if (!_chain) {
    throw new Error(`Unable to configure provider for chain ${chainId}`);
  }
  if (!publicClients[chainId]) {
    const fallbackTransports = _chain?.metamask.rpcUrls.map((url) =>
      url.startsWith("wss")
        ? (0, viem_1.webSocket)(url)
        : (0, viem_1.http)(url, {
            batch: {
              batchSize: 64,
            },
          }),
    );
    const chain = {
      ..._chain,
      name: _chain.metamask.chainName,
      rpcUrls: {
        default: { http: _chain.metamask.rpcUrls },
        public: { http: _chain.metamask.rpcUrls },
      },
      nativeCurrency: {
        name: _chain?.nativeToken.name,
        symbol: _chain?.nativeToken.symbol,
        decimals: _chain?.nativeToken.decimals,
      },
      contracts: {
        multicall3: {
          address: macros_js_1.MULTICALL_ADDRESS,
        },
      },
    };
    publicClients[chainId] = (0, viem_1.createPublicClient)({
      chain: chain,
      transport: (0, viem_1.fallback)(fallbackTransports),
      batch: {
        multicall: true,
      },
    });
  }
  if (!publicClients[chainId]) {
    throw new Error(`Unable to configure provider for chain ${chainId}`);
  }
  return publicClients[chainId];
};
exports.getPublicClient = getPublicClient;
//# sourceMappingURL=publicClient.js.map
