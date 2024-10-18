import type {
  ButterSDKProvider,
  TronProviderOptions,
} from "../../types/provider.js";

export interface TronProvider extends ButterSDKProvider {
  setOptions(options: TronProviderOptions): void;
}
