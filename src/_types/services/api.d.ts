import type {
  TokensResponse,
  GetRoutesProps,
  GetTokensForNetworkProps,
  GenerateSwapDataProps,
  GetSwapHistoryProps,
  SwapHistoryResponse,
  GetSwapHistoryDetailProps,
  SwapHistoryDetail,
} from "../types/index.js";
import type { Chain, Route, RouteTxData } from "../types/base.js";
/**
 * get all supported chain
 */
export declare const getChains: () => Promise<Chain[]>;
export declare const getTokensForNetwork: ({
  network,
  page,
  size,
  keyword,
}: GetTokensForNetworkProps) => Promise<TokensResponse>;
export declare const getRoutes: ({
  fromChainId,
  tokenOutAddress,
  toChainId,
  tokenInAddress,
  amount,
  type,
  slippage,
  entrance,
  abortSignal,
}: GetRoutesProps) => Promise<Route[]>;
export declare const generateSwapData: ({
  hash,
  slippage,
  from,
  receiver,
}: GenerateSwapDataProps) => Promise<RouteTxData[]>;
export declare const getSwapHistory: ({
  page,
  size,
  sourceAddress,
}: GetSwapHistoryProps) => Promise<SwapHistoryResponse>;
export declare const getSwapHistoryDetail: ({
  id,
}: GetSwapHistoryDetailProps) => Promise<SwapHistoryDetail | undefined>;
//# sourceMappingURL=api.d.ts.map
