import type { PublicClient } from "viem";
/**
 * Get an instance of a provider for a specific chain
 * @param chainId - Id of the chain the provider is for
 * @returns The public client for the given chain
 */
export declare const getPublicClient: (
  chainId: number,
) => Promise<PublicClient>;
//# sourceMappingURL=publicClient.d.ts.map
