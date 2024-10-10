import { ChainType } from "../types/index.js";
import { CHAIN_IDS } from "../macros/chain.js";

const chainIdToType = (chainId: number | string): ChainType => {
  let type = ChainType.EVM;
  Object.entries(CHAIN_IDS).forEach(([key, value]) => {
    if (value === chainId) {
      type = key as ChainType;
    }
  });
  return type;
};

export default chainIdToType;
