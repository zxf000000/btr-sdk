import type { SignerWalletAdapter } from "@solana/wallet-adapter-base";
import type { ButterSDKProvider } from "../../types/provider.js";
export interface SolanaProviderOptions {
  getWalletAdapter?: () => Promise<SignerWalletAdapter>;
}
export interface SolanaProvider extends ButterSDKProvider {
  setOptions(options: SolanaProviderOptions): void;
}
export declare function isSolana(
  provider: ButterSDKProvider,
): provider is SolanaProvider;
export declare const TokenProgramAddress =
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
//# sourceMappingURL=types.d.ts.map
