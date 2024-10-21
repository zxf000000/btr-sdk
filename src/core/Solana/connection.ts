import { Connection } from "@solana/web3.js";
import butterConfig from "../../config/index.js";
import { ChainType } from "../../types/index.js";

let connection: Connection | undefined = undefined;

/**
 * getSolanaConnection is just a thin wrapper around getting the connection (RPC provider) for Solana
 * @returns - Solana RPC connection
 */
export const getSolanaConnection = async (): Promise<Connection> => {
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
