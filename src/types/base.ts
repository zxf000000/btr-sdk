import type { ResponseTokenItem } from "./response.js";

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

export interface TokenInRoute {
  address: string;
  name: string;
  decimals: number;
  symbol: string;
  icon: string;
}

export interface SubRoute {
  amountIn: string;
  amountOut: string;
  dexName: string;
  path: [];
}

export interface ChainInRoute {
  bridge: string;
  chainId: string;
  tokenIn: TokenInRoute;
  tokenOut: TokenInRoute;
  totalAmountIn: string;
  totalAmountOut: string;
  route: SubRoute[];
  singleRoute?: SubRoute;
}

export interface Route {
  diff: string;
  bridgeFee: {
    amount: string;
    symbol: string;
  };
  tradeType: number;
  gasFee: {
    amount: string;
    symbol: string;
  };
  gasEstimated: string;
  hash: string;
  srcChain: ChainInRoute;
  bridgeChain: ChainInRoute;
  dstChain: ChainInRoute;
  minAmountOut: {
    amount: string;
    symbol: string;
  };
  timeEstimated: number;
}

export interface RouteTxData {
  to: string;
  data: string;
  value: string;
  method?: string;
  chainId: string;
  args: {
    type: string;
    value: any;
  }[];
}

export interface TokenAmount {
  address: string;
  amount: string;
  decimals: number;
  formatted: string;
  symbol: string;
}
