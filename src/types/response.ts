export interface ApiResponse<T> {
  code: number;
  message: string;
  errno: number;
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
  balance: number;
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

export interface SwapHistoryChainItem {
  id: number | null;
  chainId: string | null;
  chainName: string | null;
  scanUrl: string | null;
  chainImg: string | null;
}

export interface SwapHistoryTokenItem {
  id: number;
  chainId: number;
  address: string;
  name: string;
  symbol: string;
  icon: string | null;
  decimal: number;
  isMainCurrency: number;
}

export interface SwapHistory {
  receiveTokenDict: any;
  id: number;
  sourceAddress: string;
  destinationAddress: string;
  fromChainId: string;
  toChainId: string;
  sourceHash: string;
  sourceHeight: number;
  destinationHash: string | null;
  destinationHeight: number | null;
  orderId: string;
  sourceTokenAddress: string;
  destinationTokenAddress: string | null;
  amount: number;
  type: number;
  state: number;
  timestamp: string;
  sourceChain: SwapHistoryChainItem;
  destinationChain: any;
  bridgeTokenDict: any;
  sourceToken: SwapHistoryTokenItem;
  destinationToken: any | null;
  inAmount: number | null;
  receiveAmount: number | null;
  completeTime: string | null;
  isMessageBridge: number;
  relayerChain: SwapHistoryChainItem | null;
  relayerChainId: string | null;
  relayerHash: string | null;
  relayerHeight: number | null;
  chainPoolAction: number | null;
  chainPoolAmount: number | null;
  chainPoolHash: string | null;
  chainPoolAddress: string | null;
  chainPoolChainDict: SwapHistoryChainItem | null;
  chainPoolTokenDict: SwapHistoryTokenItem | null;
  stage: number | null;
}

export interface SwapHistoryResponse {
  list: SwapHistory[];
  total: number;
}

export interface SwapHistoryDetail {
  receiveToken: any;
  receiveAmount: any;
  bridgeToken: any;
  bridgeAmount: number;
  id: number;
  fromChain: SwapHistoryChainItem;
  relayerChain: SwapHistoryChainItem;
  toChain: SwapHistoryChainItem;
  tokenAddress: string;
  tokenSymbol: string;
  timestamp: string;
  completeTime: string;
  amount: number;
  inAmount: number;
  fee: string;
  state: number;
  sourceHash: string;
  relayerHash: string;
  toHash: string;
  sourceAddress: string;
  toAddress: string;
  fromTokenDecimal: number;
  sourceToken: SwapHistoryTokenItem;
  destinationToken: SwapHistoryTokenItem;
  feeToken: SwapHistoryTokenItem;
  isMessageBridge: 0;
  chainPoolAction: number | null;
  chainPoolAmount: number | null;
  chainPoolHash: string | null;
  chainPoolAddress: string | null;
  chainPoolChainDict: SwapHistoryChainItem | null;
  chainPoolTokenDict: SwapHistoryTokenItem | null;
  stage: number | null;
}
