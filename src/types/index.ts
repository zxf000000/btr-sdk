import { ResponseTokenItem } from "./response";

export * from "./response";

export interface Chain {
  id: number;
  chainId: string;
  chainType: string;
  coin: string;
  key: string;
  logoUri: string;
  mainnet: number;
  metamask: EvmChain;
  multicallAddress: string;
  name: string;
  nativeToken: NativeToken;
  tokenlistUrl: string;
  isBlock: 0;
}

export type Token = ResponseTokenItem;

export interface EvmChain {
  chainName: string;
  blockExplorerUrls: string[];
  chainId: string;
  nativeCurrency: NativeCurrency;
  rpcUrls: string[];
}

export interface NativeCurrency {
  symbol: string;
  decimals: number;
  name: string;
}

export interface NativeToken {
  symbol: string;
  address: string;
  coinKey: string;
  priceUSD: string;
  chainId: number;
  decimals: number;
  name: string;
  logoURI: string;
}
