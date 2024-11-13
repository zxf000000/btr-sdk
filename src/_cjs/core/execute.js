"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chainIdToType_js_1 = require("../utils/chainIdToType.js");
const utils_js_1 = require("./utils.js");
const executeRoute = async (route) => {
  const chainId = Array.isArray(route) ? route[0].chainId : route.chainId;
  const chainType = (0, chainIdToType_js_1.default)(chainId);
  const provider = (0, utils_js_1.getProvider)(chainType);
  if (!provider) {
    throw new Error(`Provider not found for chain ${chainId}`);
  }
  return await provider.executeRoute(route);
};
exports.default = executeRoute;
//# sourceMappingURL=execute.js.map
