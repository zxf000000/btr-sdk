import { Connection } from "@solana/web3.js";
import butterConfig from "../../config/index.js";
import { ChainType } from "../../types/index.js";
let connection = undefined;
/**
 * getSolanaConnection is just a thin wrapper around getting the connection (RPC provider) for Solana
 * @returns - Solana RPC connection
 */
export const getSolanaConnection = async () => {
  if (!connection) {
    const rpcUrl = butterConfig.rpcs?.[ChainType.SOLANA]?.[0];
    if (!rpcUrl) {
      throw new Error("Please config rpc for Solana");
    }
    connection = new Connection(rpcUrl);
    return connection;
  } else {
    return connection;
  }
};
//# sourceMappingURL=connection.js.map
