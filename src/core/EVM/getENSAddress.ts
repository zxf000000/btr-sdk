import { getEnsAddress, normalize } from "viem/ens";
import { getPublicClient } from "./publicClient.js";

export const getENSAddress = async (
  name: string,
): Promise<string | undefined> => {
  try {
    const client = await getPublicClient(1);
    const address = await getEnsAddress(client, {
      name: normalize(name),
    });
    return address as string | undefined;
  } catch (_) {
    // ignore
    return;
  }
};
