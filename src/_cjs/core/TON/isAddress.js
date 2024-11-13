"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAddress = isAddress;
const core_1 = require("@ton/core");
function isAddress(address) {
  try {
    core_1.Address.parse(address);
    return true;
  } catch (error) {
    return false;
  }
}
//# sourceMappingURL=isAddress.js.map
