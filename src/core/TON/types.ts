import type {
  ButterSDKProvider,
  TonProviderOptions,
} from "../../types/provider.js";

export interface TonProvider extends ButterSDKProvider {
  setOptions(options: TonProviderOptions): void;
}
