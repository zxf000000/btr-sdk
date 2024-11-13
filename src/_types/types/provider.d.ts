import type { RouteTxData, Token, TokenAmount } from "./base.js";
import { ChainType } from "./chain.js";
import type { WalletClient } from "viem";
import type { SwitchChainHook } from "../core/EVM/types.js";
import type { ITonConnect } from "@tonconnect/sdk";
import type { TonConnectUI } from "@tonconnect/ui";
import { Adapter } from "@tronweb3/tronwallet-abstract-adapter";
export interface ButterSDKProvider {
  readonly providerType: ChainType;
  isAddress(address: string): boolean;
  executeRoute(route: RouteTxData | RouteTxData[]): Promise<string>;
  getBalance(walletAddress: string, tokens: Token[]): Promise<TokenAmount[]>;
}
export interface EvmProviderOptions {
  walletClient: WalletClient;
  switchChain?: SwitchChainHook;
}
export interface TonProviderOptions {
  getConnector?: () => Promise<ITonConnect | TonConnectUI>;
}
export interface TronProviderOptions {
  getAdapter?: () => Promise<Adapter>;
}
//# sourceMappingURL=provider.d.ts.map
