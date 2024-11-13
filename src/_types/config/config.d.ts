import type { ButterSDKConfigOptions, SDKRpcs } from "../types/config.js";
import type { Chain } from "../types/base.js";
import type { ButterSDKProvider } from "../types/provider.js";
declare class ButterSDKConfig {
  private static instance;
  apiUrl: string;
  routeApiUrl: string;
  historyApiUrl: string;
  version: string;
  providers: ButterSDKProvider[];
  chains: Chain[];
  rpcs?: SDKRpcs;
  loading: Promise<void> | undefined;
  private constructor();
  static getInstance(): ButterSDKConfig;
  setOptions(options: ButterSDKConfigOptions): void;
  getChainById(chainId: number): Promise<Chain | undefined>;
  private loadChains;
}
declare const butterConfig: ButterSDKConfig;
export default butterConfig;
//# sourceMappingURL=config.d.ts.map
