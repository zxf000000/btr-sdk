import type { NearProviderOptions } from "./types.js";
import { ChainType, type RouteTxData } from "../../types/index.js";
import { isAddress } from "./isAddress.js";
import { getNearBalance } from "./getNearBalance.js";
import type { FunctionCallAction } from "./actions.js";

export function createNearProvider(options: NearProviderOptions) {
  const _options: NearProviderOptions = options ?? {};
  return {
    providerType: ChainType.NEAR,
    isAddress,
    getBalance: getNearBalance,
    async executeRoute(route: RouteTxData[]): Promise<string> {
      if (!_options.getWallet) {
        throw new Error(`Wallet is not provided.`);
      }
      const wallet = await _options.getWallet();
      const to = route[0].to;
      const actions = route.map((item) => {
        return {
          type: "FunctionCall",
          params: {
            methodName: item.method,
            args: JSON.parse(item.data),
            gas: "300000000000000",
            deposit: item.value || "0",
          },
        } as FunctionCallAction;
      });
      const result = await wallet.signAndSendTransaction({
        receiverId: to,
        actions: actions,
      });
      return result.transaction;
    },
    setOptions(options: NearProviderOptions) {
      Object.assign(_options, options);
    },
  };
}
