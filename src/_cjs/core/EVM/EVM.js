"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvmProvider = createEvmProvider;
const viem_1 = require("viem");
const getEVMBalance_js_1 = require("./getEVMBalance.js");
const publicClient_js_1 = require("./publicClient.js");
const chain_js_1 = require("../../types/chain.js");
function createEvmProvider(options) {
  const _options = options ?? {};
  return {
    providerType: chain_js_1.ChainType.EVM,
    isAddress: viem_1.isAddress,
    getBalance: getEVMBalance_js_1.getEVMBalance,
    async executeRoute(route) {
      if (!_options.walletClient) {
        throw new Error(`Client is not provided.`);
      }
      const walletClient = _options.walletClient;
      console.log(walletClient, "wallet client", _options);
      if (
        !walletClient ||
        !walletClient.account ||
        !walletClient.account.address
      ) {
        throw new Error(`Wallet is not connected.`);
      }
      const publicClient = await (0, publicClient_js_1.getPublicClient)(
        Number(route.chainId),
      );
      const gas = await publicClient.estimateGas({
        to: route.to,
        data: route.data,
        value: BigInt(route.value || 0),
        account: walletClient.account?.address,
      });
      return await walletClient.sendTransaction({
        to: route.to,
        data: route.data,
        value: BigInt(route.value || 0),
        gas: (gas * BigInt(15)) / BigInt(10),
        account: walletClient.account?.address,
        chain: null,
      });
    },
    setOptions(options) {
      Object.assign(_options, options);
    },
  };
}
//# sourceMappingURL=EVM.js.map
