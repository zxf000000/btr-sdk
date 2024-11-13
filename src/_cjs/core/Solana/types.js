"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenProgramAddress = void 0;
exports.isSolana = isSolana;
const index_js_1 = require("../../types/index.js");
function isSolana(provider) {
  return provider.providerType === index_js_1.ChainType.SOLANA;
}
exports.TokenProgramAddress = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
//# sourceMappingURL=types.js.map
