"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTronProvider = createTronProvider;
const isAddress_js_1 = require("./isAddress.js");
const getTronBalance_js_1 = require("./getTronBalance.js");
const index_js_1 = require("../../types/index.js");
const getTronClient_js_1 = require("./getTronClient.js");
function createTronProvider(options) {
  const _options = options ?? {};
  return {
    providerType: index_js_1.ChainType.TRON,
    isAddress: isAddress_js_1.isAddress,
    getBalance: getTronBalance_js_1.getTronBalance,
    async executeRoute(route) {
      if (!_options.getAdapter) {
        throw new Error(`Adapter is not provided.`);
      }
      const adapter = await _options.getAdapter();
      const fromAddress = adapter.address;
      const tronClient = (0, getTronClient_js_1.getTronClient)();
      if (!adapter) {
        throw new Error(`Adapter is not connected.`);
      }
      if (!fromAddress) {
        throw new Error(`Wallet is not connected.`);
      }
      let functionSelector = route.method + "(";
      route.args.map((item, index) => {
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
          fromAddress,
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
          fromAddress,
        );
      const unsignedTxnData = unsignedTxn.transaction;
      if (!unsignedTxnData)
        throw new Error("triggerSmartContract failed to create transaction");
      const signedTxn = await adapter.signTransaction(unsignedTxnData);
      const res = await tronClient.trx.sendRawTransaction(signedTxn);
      return res.transaction;
    },
    setOptions(options) {
      Object.assign(_options, options);
    },
  };
}
//# sourceMappingURL=Tron.js.map
