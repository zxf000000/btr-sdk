import { ChainType } from "../types/index.js";
import butterConfig from "../config/index.js";
export const getProvider = (chainType) => {
  return butterConfig.providers.find(
    (provider) => provider.providerType === chainType,
  );
};
//# sourceMappingURL=utils.js.map
