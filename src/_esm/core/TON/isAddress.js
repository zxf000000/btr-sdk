import { Address } from "@ton/core";
export function isAddress(address) {
  try {
    Address.parse(address);
    return true;
  } catch (error) {
    return false;
  }
}
//# sourceMappingURL=isAddress.js.map
