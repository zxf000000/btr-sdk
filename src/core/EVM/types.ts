import type {
  ButterSDKProvider,
  EvmProviderOptions,
} from "../../types/provider.js";

export type SwitchChainHook = (chainId: number) => Promise<void>;

export interface EVMProvider extends ButterSDKProvider {
  setOptions(options: EvmProviderOptions): void;
}
