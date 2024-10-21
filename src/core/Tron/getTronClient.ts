import { TronWeb, providers } from "tronweb";
import butterConfig from "../../config/index.js";
import { ChainType } from "../../types/index.js";

export const getTronClient = () => {
  const TronRpc = butterConfig.rpcs?.[ChainType.TRON]?.urls?.[0];
  const headers = butterConfig.rpcs?.[ChainType.TRON]?.headers;
  if (!TronRpc) {
    throw new Error("Please provide rpcs for Tron chain");
  }
  const HttpProvider = providers.HttpProvider;
  const fullNode = new HttpProvider(TronRpc, undefined, undefined, undefined, {
    ...headers,
  });
  const solidityNode = new HttpProvider(
    TronRpc,
    undefined,
    undefined,
    undefined,
    {
      ...headers,
    },
  );
  const fullHost = new HttpProvider(TronRpc, undefined, undefined, undefined, {
    ...headers,
  });
  const eventServer = new HttpProvider(
    TronRpc,
    undefined,
    undefined,
    undefined,
    {
      ...headers,
    },
  );
  return new TronWeb({
    fullNode,
    solidityNode,
    fullHost,
    eventServer,
  });
};
