import type { ButterSDKProvider } from "./provider.js";
import { ChainType } from "./chain.js";

export type SDKRpcs = {
  [ChainType.SOLANA]?: string[];
  [ChainType.NEAR]?: string[];
  [ChainType.TON]?: string[];
  [ChainType.TRON]?: {
    urls?: string[];
    headers: Record<string, string>;
  };
  [ChainType.EVM]?: Record<string, string>;
};

export interface ButterSDKConfigOptions {
  version?: string;
  apiUrl?: string;
  routeApiUrl?: string;
  historyApiUrl?: string;
  providers: ButterSDKProvider[];
  rpcs?: SDKRpcs;
}

export interface TronRpcConfig {
  fullNode: string;
  solidityNode: string;
  eventServer: string;
}
