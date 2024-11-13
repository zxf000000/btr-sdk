"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSolanaProvider = createSolanaProvider;
const index_js_1 = require("../../types/index.js");
const isAddress_js_1 = require("./isAddress.js");
const getSolanaBalance_js_1 = require("./getSolanaBalance.js");
const web3_js_1 = require("@solana/web3.js");
const connection_js_1 = require("./connection.js");
function createSolanaProvider(options) {
  const _options = options ?? {};
  return {
    providerType: index_js_1.ChainType.SOLANA,
    isAddress: isAddress_js_1.isAddress,
    getBalance: getSolanaBalance_js_1.getSolanaBalance,
    async executeRoute(route) {
      if (!_options.getWalletAdapter) {
        throw new Error(`getWalletAdapter is not provided.`);
      }
      const walletAdapter = await _options.getWalletAdapter();
      const connection = await (0, connection_js_1.getSolanaConnection)();
      const txData = route.data.startsWith("0x")
        ? route.data.slice(2)
        : route.data;
      const versionedTransaction = web3_js_1.VersionedTransaction.deserialize(
        Buffer.from(txData, "hex"),
      );
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
