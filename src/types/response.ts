export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface ChainsResponse {
  chains: ResponseChainItem[];
}

export interface TokensResponse {
  count: number;
  results: ResponseTokenItem[];
}

export interface ResponseChainItem {
  id: number;
  chainId: string;
  chainType: string;
  coin: string;
  key: string;
  logoUri: string;
  mainnet: number;
  metamask: '{"chainName":"Ethereum Mainnet","blockExplorerUrls":["https://etherscan.io/"],"chainId":"0x1","nativeCurrency":{"symbol":"ETH","decimals":18,"name":"ETH"},"rpcUrls":["https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"]}';
  multicallAddress: string;
  name: string;
  nativeToken: '{"symbol":"ETH","address":"0x0000000000000000000000000000000000000000","coinKey":"ETH","priceUSD":"1885.39","chainId":1,"decimals":18,"name":"ETH","logoURI":"https://static.debank.com/image/token/logo_url/eth/935ae4e4d1d12d59a99717a24f2540b5.png"}';
  tokenlistUrl: string;
  isBlock: 0;
}

export interface ResponseTokenItem {
  id: number;
  chainId: string;
  address: string;
  blockchainNetwork: string;
  coingeckoId: string;
  decimals: number;
  image: string;
  name: string;
  rank: string;
  symbol: string;
  usdprice: number;
  usedIniframe: number;
}

export interface BsRoute {
  fromChainId: string;
  toChainId: string;
  amount: string;
  tokenInAddress: string;
  tokenOutAddress: string;
  type: "exactIn" | "exactOut";
  slippage: string;
  entrance: string;
}
