import type { TronProviderOptions } from "../../types/provider.js";
import type { TronProvider } from "../EVM/utils.js";
import { isAddress } from "./isAddress.js";
import { getTronBalance } from "./getTronBalance.js";
import { ChainType, type RouteTxData } from "../../types/index.js";
import { getTronClient } from "./getTronClient.js";

export function createTronProvider(
  options?: TronProviderOptions,
): TronProvider {
  const _options: TronProviderOptions = options ?? {};
  return {
    providerType: ChainType.TRON,
    isAddress,
    getBalance: getTronBalance,
    async executeRoute(route: RouteTxData): Promise<string> {
      if (!_options.getAdapter) {
        throw new Error(`Adapter is not provided.`);
      }
      const adapter = await _options.getAdapter();
      const fromAddress = adapter.address;
      const tronClient = getTronClient();
      if (!adapter) {
        throw new Error(`Adapter is not connected.`);
      }
      if (!fromAddress) {
        throw new Error(`Wallet is not connected.`);
      }
      let functionSelector = route.method + "(";
      route.args.map((item: any, index: number) => {
        if (index !== 0) functionSelector += ",";
        functionSelector += item.type;
      });
      functionSelector += ")";

      const preExecResult =
        await tronClient.transactionBuilder.triggerConstantContract(
          route.to,
          functionSelector,
          {
            callValue: Number(route.value),
          },
          route.args,
          fromAddress, // from address
        );

      if (
        !preExecResult ||
        !preExecResult.constant_result ||
        preExecResult.constant_result.length === 0
      ) {
        throw new Error("pre-execute error");
      }

      const unsignedTxn =
        await tronClient.transactionBuilder.triggerSmartContract(
          route.to,
          functionSelector,
          {
            callValue: Number(route.value),
            feeLimit: 500000000,
          },
          route.args,
          fromAddress, // from address
        );

      const unsignedTxnData = unsignedTxn.transaction;
      if (!unsignedTxnData)
        throw new Error("triggerSmartContract failed to create transaction");

      const signedTxn = await adapter.signTransaction(unsignedTxnData as any);
      const res = await tronClient.trx.sendRawTransaction(signedTxn as any);
      return res.transaction;
    },
    setOptions(options: TronProviderOptions) {
      Object.assign(_options, options);
    },
    // resolveAddress: getENSAddress,
  };
}
