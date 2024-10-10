import type { ButterSDKProvider } from "./provider.js";

export interface ButterSDKConfigOptions {
  version?: string;
  apiUrl?: string;
  routeApiUrl?: string;
  historyApiUrl?: string;
  rpcUrls?: string[];
  providers: ButterSDKProvider[];
}
