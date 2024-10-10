import { Connection } from "@solana/web3.js";

let connection: Connection | undefined = undefined;

/**
 * getSolanaConnection is just a thin wrapper around getting the connection (RPC provider) for Solana
 * @returns - Solana RPC connection
 */
export const getSolanaConnection = async (): Promise<Connection> => {
  if (!connection) {
    const rpcUrl =
      "https://lb.drpc.org/ogrpc?network=solana&dkey=AknBRwAOBUmSsmLlA3fGJ3R4KXXcIaoR76h1rr3WfgV4";
    connection = new Connection(rpcUrl);
    return connection;
  } else {
    return connection;
  }
};
