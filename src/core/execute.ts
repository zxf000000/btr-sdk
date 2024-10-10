import type { RouteTxData } from "../types/index.js";
import chainIdToType from "../utils/chainIdToType.js";
import { getProvider } from "./utils.js";

const executeRoute = async (route: RouteTxData) => {
  const chainType = chainIdToType(route.chainId);
  const provider = getProvider(chainType);
  if (!provider) {
    throw new Error(`Provider not found for chain ${route.chainId}`);
  }
  return await provider.executeRoute(route);
};

export default executeRoute;
