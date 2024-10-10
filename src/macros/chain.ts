import { ChainType } from "../types/chain.js";

export const NEAR_CHAINID = "1360100178526209";
export const SOLANA_CHAINID = "1360108768460801";
export const TRON_CHAINID = "728126428";
export const TON_CHAINID = "1360104473493505";

export const CHAIN_IDS: Record<ChainType, string> = {
  [ChainType.NEAR]: NEAR_CHAINID,
  [ChainType.SOLANA]: SOLANA_CHAINID,
  [ChainType.TON]: TON_CHAINID,
  [ChainType.TRON]: TRON_CHAINID,
  [ChainType.EVM]: "1",
};
