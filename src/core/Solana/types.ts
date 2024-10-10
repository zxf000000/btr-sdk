import type { SignerWalletAdapter } from "@solana/wallet-adapter-base";
import type { ButterSDKProvider } from "../../types/provider.js";
import { ChainType } from "../../types/index.js";

export interface SolanaProviderOptions {
  getWalletAdapter?: () => Promise<SignerWalletAdapter>;
}

export interface SolanaProvider extends ButterSDKProvider {
  setOptions(options: SolanaProviderOptions): void;
}

export function isSolana(
  provider: ButterSDKProvider,
): provider is SolanaProvider {
  return provider.providerType === ChainType.SOLANA;
}

export const TokenProgramAddress =
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
