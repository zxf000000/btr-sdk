"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAddress = isAddress;
function isAddress(address) {
  const accountIdRegex = /^(([a-z0-9_-]{2,64})|([a-f0-9]{64}))(\.near)?$/;
  return accountIdRegex.test(address);
}
//# sourceMappingURL=isAddress.js.map
