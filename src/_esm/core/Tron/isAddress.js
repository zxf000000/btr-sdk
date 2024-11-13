import { TronWeb } from "tronweb";
const tronWeb = new TronWeb({
  fullHost: "https://api.trongrid.io", // 主网节点
});
export function isAddress(address) {
  return tronWeb.isAddress(address);
}
//# sourceMappingURL=isAddress.js.map
