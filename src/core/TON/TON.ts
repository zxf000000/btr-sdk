import type { TonProviderOptions } from "../../types/provider.js";
import type { TonProvider } from "./types.js";
import { ChainType, type RouteTxData } from "../../types/index.js";
import { isAddress } from "./isAddress.js";
import { CHAIN } from "@tonconnect/sdk";
import { getTonBalance } from "./getTonBalance.js";

export function createTonProvider(options?: TonProviderOptions): TonProvider {
  const _options: TonProviderOptions = options ?? {};
  return {
    providerType: ChainType.TON,
    isAddress,
    getBalance: getTonBalance,
    async executeRoute(route: RouteTxData) {
      if (!_options.getConnector) {
        throw new Error(`Connector is not provided.`);
      }
      const connector = await _options.getConnector();
      const hash = await connector.sendTransaction({
        network: CHAIN.MAINNET,
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
    setOptions(options: TonProviderOptions) {
      Object.assign(_options, options);
    },
  };
}
