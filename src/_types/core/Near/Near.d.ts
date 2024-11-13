import type { NearProviderOptions } from "./types.js";
import { ChainType, type RouteTxData } from "../../types/index.js";
import { isAddress } from "./isAddress.js";
import { getNearBalance } from "./getNearBalance.js";
export declare function createNearProvider(options: NearProviderOptions): {
  providerType: ChainType;
  isAddress: typeof isAddress;
  getBalance: typeof getNearBalance;
  executeRoute(route: RouteTxData[]): Promise<string>;
  setOptions(options: NearProviderOptions): void;
};
//# sourceMappingURL=Near.d.ts.map
