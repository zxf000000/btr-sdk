export interface GetTokensForNetworkProps {
  network: string;
  page?: number;
  size?: number;
  keyword?: string;
}

export interface GetRoutesProps {
  fromChainId: string;
  toChainId: string;
  amount: string;
  tokenInAddress: string;
  tokenOutAddress: string;
  type?: "exactIn" | "exactOut";
  slippage: string;
  entrance?: string;
  abortSignal?: AbortSignal;
}

export interface GenerateSwapDataProps {
  hash: string;
  slippage: string;
  receiver: string;
  from: string;
}

export interface GetSwapHistoryProps {
  page: number;
  size: number;
  sourceAddress: string;
}

export interface GetSwapHistoryDetailProps {
  id: string;
}
