import { createPublicClient, fallback, http, webSocket } from "viem";
import config from "../../config/index.js";
import { MULTICALL_ADDRESS } from "./macros.js";
// cached providers
const publicClients = {};
/**
 * Get an instance of a provider for a specific chain
 * @param chainId - Id of the chain the provider is for
 * @returns The public client for the given chain
 */
export const getPublicClient = async (chainId) => {
  const _chain = await config.getChainById(chainId);
  if (!_chain) {
    throw new Error(`Unable to configure provider for chain ${chainId}`);
  }
  if (!publicClients[chainId]) {
    const fallbackTransports = _chain?.metamask.rpcUrls.map((url) =>
      url.startsWith("wss")
        ? webSocket(url)
        : http(url, {
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
          address: MULTICALL_ADDRESS,
        },
      },
    };
    publicClients[chainId] = createPublicClient({
      chain: chain,
      transport: fallback(fallbackTransports),
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
//# sourceMappingURL=publicClient.js.map
