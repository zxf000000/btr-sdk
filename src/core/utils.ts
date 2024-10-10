import { ChainType } from "../types/index.js";
import butterConfig from "../config/index.js";

export const getProvider = (chainType: ChainType) => {
  return butterConfig.providers.find(
    (provider) => provider.providerType === chainType,
  );
};
