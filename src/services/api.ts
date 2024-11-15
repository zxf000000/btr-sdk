import { request } from "./request.js";
import { butterConfig } from "../index.js";
import type {
  ChainsResponse,
  ResponseChainItem,
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
export const getChains = async () => {
  const queryPath = butterConfig.routeApiUrl.includes("test")
    ? "queryChainListTest"
    : "queryChainList";
  const response = await request<ChainsResponse>(
    `${butterConfig.apiUrl}/api/${queryPath}?type=1`,
    {
      method: "GET",
    },
  );
  const formatted: Chain[] = response.data.chains.map(
    (chain: ResponseChainItem) => {
      let metamask: any = {};
      let nativeToken: any = {};
      try {
        metamask = JSON.parse(chain.metamask);
        nativeToken = JSON.parse(chain.nativeToken);
      } catch (error) {
        console.error("parse chain error", error);
      }
      return {
        ...chain,
        metamask,
        nativeToken,
      };
    },
  );
  return formatted;
};

export const getTokensForNetwork = async ({
  network,
  page = 1,
  size = 10,
  keyword,
}: GetTokensForNetworkProps) => {
  const params = new URLSearchParams({
    network,
    page: page.toString(),
    size: size.toString(),
  });
  if (keyword) {
    params.set("symbol", keyword);
  }
  const result = await request<TokensResponse>(
    `${butterConfig.apiUrl}/api/queryTokenList?` + params,
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
    `${butterConfig.routeApiUrl}/route?` + params,
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
    `${butterConfig.routeApiUrl}/swap?` + params,
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
    `${butterConfig.historyApiUrl}/api/queryBridgeHistoryByAddress?page=${page}&size=${size}&address=${sourceAddress}`,
  );
  return result.data;
};

export const getSwapHistoryDetail = async ({
  id,
}: GetSwapHistoryDetailProps) => {
  const result = await request<{ info: SwapHistoryDetail } | null>(
    `${butterConfig.historyApiUrl}/api/queryBridgeInfoById?id=${id}`,
  );
  return result.data?.info;
};
