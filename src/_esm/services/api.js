import { request } from "./request.js";
import { butterConfig } from "../index.js";
/**
 * get all supported chain
 */
export const getChains = async () => {
  const queryPath = butterConfig.routeApiUrl.includes("test")
    ? "queryChainListTest"
    : "queryChainList";
  const response = await request(
    `${butterConfig.apiUrl}/api/${queryPath}?type=1`,
    {
      method: "GET",
    },
  );
  const formatted = response.data.chains.map((chain) => {
    let metamask = {};
    let nativeToken = {};
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
  });
  return formatted;
};
export const getTokensForNetwork = async ({
  network,
  page = 1,
  size = 10,
  keyword,
}) => {
  const params = new URLSearchParams({
    network,
    page: page.toString(),
    size: size.toString(),
  });
  if (keyword) {
    params.set("symbol", keyword);
  }
  const result = await request(
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
}) => {
  const params = new URLSearchParams();
  params.set("fromChainId", fromChainId);
  params.set("toChainId", toChainId);
  params.set("amount", amount);
  params.set("tokenInAddress", tokenInAddress);
  params.set("tokenOutAddress", tokenOutAddress);
  params.set("type", type);
  params.set("slippage", slippage);
  params.set("entrance", entrance);
  const result = await request(`${butterConfig.routeApiUrl}/route?` + params, {
    method: "GET",
    signal: abortSignal,
  });
  return result.data;
};
export const generateSwapData = async ({ hash, slippage, from, receiver }) => {
  const params = new URLSearchParams();
  params.set("hash", hash);
  params.set("slippage", slippage);
  params.set("from", from);
  params.set("receiver", receiver);
  const result = await request(`${butterConfig.routeApiUrl}/swap?` + params, {
    method: "GET",
  });
  return result.data;
};
export const getSwapHistory = async ({ page, size, sourceAddress }) => {
  const result = await request(
    `${butterConfig.historyApiUrl}/api/queryBridgeHistoryByAddress?page=${page}&size=${size}&address=${sourceAddress}`,
  );
  return result.data;
};
export const getSwapHistoryDetail = async ({ id }) => {
  const result = await request(
    `${butterConfig.historyApiUrl}/api/queryBridgeInfoById?id=${id}`,
  );
  return result.data?.info;
};
//# sourceMappingURL=api.js.map
