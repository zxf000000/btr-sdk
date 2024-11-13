import { ChainType } from "../../types/index.js";
import { isAddress } from "./isAddress.js";
import { CHAIN } from "@tonconnect/sdk";
import { getTonBalance } from "./getTonBalance.js";
export function createTonProvider(options) {
  const _options = options ?? {};
  return {
    providerType: ChainType.TON,
    isAddress,
    getBalance: getTonBalance,
    async executeRoute(route) {
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
    setOptions(options) {
      Object.assign(_options, options);
    },
  };
}
//# sourceMappingURL=TON.js.map
