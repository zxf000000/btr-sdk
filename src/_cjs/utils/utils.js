"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isZeroAddress = void 0;
const constants_1 = require("./constants");
const isZeroAddress = (address) => {
  return (
    address === constants_1.AddressZero ||
    address === constants_1.AlternativeAddressZero
  );
};
exports.isZeroAddress = isZeroAddress;
//# sourceMappingURL=utils.js.map
