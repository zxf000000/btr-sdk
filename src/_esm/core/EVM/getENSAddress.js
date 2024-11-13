import { getEnsAddress, normalize } from "viem/ens";
import { getPublicClient } from "./publicClient.js";
export const getENSAddress = async (name) => {
  try {
    const client = await getPublicClient(1);
    const address = await getEnsAddress(client, {
      name: normalize(name),
    });
    return address;
  } catch (_) {
    // ignore
    return;
  }
};
//# sourceMappingURL=getENSAddress.js.map
