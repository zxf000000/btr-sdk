import { isAddress } from "viem";
import { getEVMBalance } from "./getEVMBalance.js";
import { getPublicClient } from "./publicClient.js";
import { ChainType } from "../../types/chain.js";
export function createEvmProvider(options) {
  const _options = options ?? {};
  return {
    providerType: ChainType.EVM,
    isAddress,
    getBalance: getEVMBalance,
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
      const publicClient = await getPublicClient(Number(route.chainId));
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
    // resolveAddress: getENSAddress,
  };
}
//# sourceMappingURL=EVM.js.map
