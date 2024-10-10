import type { RouteTxData, Token, TokenAmount } from "./base.js";
import { ChainType } from "./chain.js";
import type { WalletClient } from "viem";
import type { SwitchChainHook } from "../core/EVM/types.js";
import type { ITonConnect } from "@tonconnect/sdk";
import type { TonConnectUI } from "@tonconnect/ui";

export interface ButterSDKProvider {
  readonly providerType: ChainType;

  isAddress(address: string): boolean;

  // resolveAddress(name: string): Promise<string | undefined>;

  executeRoute(route: RouteTxData): Promise<string>;

  getBalance(walletAddress: string, tokens: Token[]): Promise<TokenAmount[]>;
}

export interface EvmProviderOptions {
  getWalletClient?: () => Promise<WalletClient>;
  switchChain?: SwitchChainHook;
}

export interface TonProviderOptions {
  getConnector?: () => Promise<ITonConnect | TonConnectUI>;
}
