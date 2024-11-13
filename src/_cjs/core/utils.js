"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProvider = void 0;
const index_js_1 = require("../config/index.js");
const getProvider = (chainType) => {
  return index_js_1.default.providers.find(
    (provider) => provider.providerType === chainType,
  );
};
exports.getProvider = getProvider;
//# sourceMappingURL=utils.js.map
