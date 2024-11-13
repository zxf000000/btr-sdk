"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAddress = isAddress;
const tronweb_1 = require("tronweb");
const tronWeb = new tronweb_1.TronWeb({
  fullHost: "https://api.trongrid.io",
});
function isAddress(address) {
  return tronWeb.isAddress(address);
}
//# sourceMappingURL=isAddress.js.map
