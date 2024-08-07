import { request } from "./request";
import { baseConfig } from "../macros/base-config";
import {
  Chain,
  ChainsResponse,
  ResponseChainItem,
  Route,
  TokensResponse,
  GetRoutesProps,
  GetTokensForNetworkProps,
  GenerateSwapDataProps,
  RouteTxData,
  GetSwapHistoryProps,
  SwapHistoryResponse,
  GetSwapHistoryDetailProps,
  SwapHistoryDetail,
} from "../types";

/**
 * get all supported chain
 */
export const getChains = async () => {
  const response = await request<ChainsResponse>(
    `${baseConfig.apiUrl}/api/queryChainList?type=1`,
    {
      method: "GET",
    },
  );
  const formatted: Chain[] = response.data.chains.map(
    (chain: ResponseChainItem) => {
      return {
        ...chain,
        metamask: chain.metamask ? JSON.parse(chain.metamask) : {},
        nativeToken: chain.nativeToken ? JSON.parse(chain.nativeToken) : {},
      };
    },
  );
  return formatted;
};

export const getTokensForNetwork = async ({
  network,
  page = 1,
  size = 10,
}: GetTokensForNetworkProps) => {
  const result = await request<TokensResponse>(
    `${baseConfig.apiUrl}/api/queryTokenList?network=${network}&page=${page}&size=${size}`,
  );
  return result.data;
};

export const getRoutes = async ({
  fromChainId,
  tokenOutAddress,
  toChainId,
  tokenInAddress,
  amount,
  type = "exactIn",
  slippage,
  entrance = "Butter+",
  abortSignal,
}: GetRoutesProps) => {
  const params = new URLSearchParams();
  params.set("fromChainId", fromChainId);
  params.set("toChainId", toChainId);
  params.set("amount", amount);
  params.set("tokenInAddress", tokenInAddress);
  params.set("tokenOutAddress", tokenOutAddress);
  params.set("type", type);
  params.set("slippage", slippage);
  params.set("entrance", entrance);
  const result = await request<Route[]>(
    `${baseConfig.routeApiUrl}/route?` + params,
    {
      method: "GET",
      signal: abortSignal,
    },
  );
  return result.data;
};

export const generateSwapData = async ({
  hash,
  slippage,
  from,
  receiver,
}: GenerateSwapDataProps) => {
  const params = new URLSearchParams();
  params.set("hash", hash);
  params.set("slippage", slippage);
  params.set("from", from);
  params.set("receiver", receiver);
  const result = await request<RouteTxData[]>(
    `${baseConfig.routeApiUrl}/swap?` + params,
    {
      method: "GET",
    },
  );
  return result.data;
};

export const getSwapHistory = async ({
  page,
  size,
  sourceAddress,
}: GetSwapHistoryProps) => {
  const result = await request<SwapHistoryResponse>(
    `${baseConfig.historyApiUrl}/api/queryBridgeHistoryByAddress?page=${page}&size=${size}&address=${sourceAddress}`,
  );
  return result.data;
};

export const getSwapHistoryDetail = async ({
  hash,
}: GetSwapHistoryDetailProps) => {
  const result = await request<{ info: SwapHistoryDetail } | null>(
    `${baseConfig.historyApiUrl}/api/queryBridgeInfoBySourceHash?hash=${hash}`,
  );
  return result.data?.info;
};
