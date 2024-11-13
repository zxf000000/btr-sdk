import { ChainType } from "../types/index.js";
import { CHAIN_IDS } from "../macros/chain.js";
const chainIdToType = (chainId) => {
  let type = ChainType.EVM;
  Object.entries(CHAIN_IDS).forEach(([key, value]) => {
    if (value === chainId) {
      type = key;
    }
  });
  return type;
};
export default chainIdToType;
//# sourceMappingURL=chainIdToType.js.map
