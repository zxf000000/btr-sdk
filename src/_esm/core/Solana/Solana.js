import { ChainType } from "../../types/index.js";
import { isAddress } from "./isAddress.js";
import { getSolanaBalance } from "./getSolanaBalance.js";
import { VersionedTransaction } from "@solana/web3.js";
import { getSolanaConnection } from "./connection.js";
export function createSolanaProvider(options) {
  const _options = options ?? {};
  return {
    providerType: ChainType.SOLANA,
    isAddress,
    getBalance: getSolanaBalance,
    async executeRoute(route) {
      if (!_options.getWalletAdapter) {
        throw new Error(`getWalletAdapter is not provided.`);
      }
      const walletAdapter = await _options.getWalletAdapter();
      const connection = await getSolanaConnection();
      const txData = route.data.startsWith("0x")
        ? route.data.slice(2)
        : route.data;
      const versionedTransaction = VersionedTransaction.deserialize(
        Buffer.from(txData, "hex"),
      );
      // updatePriorityFee(versionedTransaction, NEW_CU_PRICE);
      const {
        value: { blockhash, lastValidBlockHeight },
      } = await connection.getLatestBlockhashAndContext();
      versionedTransaction.message.recentBlockhash = blockhash;
      const tx = await walletAdapter.signTransaction(versionedTransaction);
      const signature = await connection.sendTransaction(tx);
      await connection.confirmTransaction(
        {
          signature,
          lastValidBlockHeight,
          blockhash,
        },
        "processed",
      );
      return signature;
    },
    setOptions(options) {
      Object.assign(_options, options);
    },
  };
}
//# sourceMappingURL=Solana.js.map
