"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getENSAddress = void 0;
const ens_1 = require("viem/ens");
const publicClient_js_1 = require("./publicClient.js");
const getENSAddress = async (name) => {
  try {
    const client = await (0, publicClient_js_1.getPublicClient)(1);
    const address = await (0, ens_1.getEnsAddress)(client, {
      name: (0, ens_1.normalize)(name),
    });
    return address;
  } catch (_) {
    return;
  }
};
exports.getENSAddress = getENSAddress;
//# sourceMappingURL=getENSAddress.js.map
