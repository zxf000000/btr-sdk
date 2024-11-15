"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSwapHistoryDetail =
  exports.getSwapHistory =
  exports.generateSwapData =
  exports.getRoutes =
  exports.getTokensForNetwork =
  exports.getChains =
    void 0;
const request_js_1 = require("./request.js");
const index_js_1 = require("../index.js");
const getChains = async () => {
  const queryPath = index_js_1.butterConfig.routeApiUrl.includes("test")
    ? "queryChainListTest"
    : "queryChainList";
  const response = await (0, request_js_1.request)(
    `${index_js_1.butterConfig.apiUrl}/api/${queryPath}?type=1`,
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
exports.getChains = getChains;
const getTokensForNetwork = async ({
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
  const result = await (0, request_js_1.request)(
    `${index_js_1.butterConfig.apiUrl}/api/queryTokenList?` + params,
  );
  return result.data;
};
exports.getTokensForNetwork = getTokensForNetwork;
const getRoutes = async ({
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
  const result = await (0, request_js_1.request)(
    `${index_js_1.butterConfig.routeApiUrl}/route?` + params,
    {
      method: "GET",
      signal: abortSignal,
    },
  );
  return result.data;
};
exports.getRoutes = getRoutes;
const generateSwapData = async ({ hash, slippage, from, receiver }) => {
  const params = new URLSearchParams();
  params.set("hash", hash);
  params.set("slippage", slippage);
  params.set("from", from);
  params.set("receiver", receiver);
  const result = await (0, request_js_1.request)(
    `${index_js_1.butterConfig.routeApiUrl}/swap?` + params,
    {
      method: "GET",
    },
  );
  return result.data;
};
exports.generateSwapData = generateSwapData;
const getSwapHistory = async ({ page, size, sourceAddress }) => {
  const result = await (0, request_js_1.request)(
    `${index_js_1.butterConfig.historyApiUrl}/api/queryBridgeHistoryByAddress?page=${page}&size=${size}&address=${sourceAddress}`,
  );
  return result.data;
};
exports.getSwapHistory = getSwapHistory;
const getSwapHistoryDetail = async ({ id }) => {
  const result = await (0, request_js_1.request)(
    `${index_js_1.butterConfig.historyApiUrl}/api/queryBridgeInfoById?id=${id}`,
  );
  return result.data?.info;
};
exports.getSwapHistoryDetail = getSwapHistoryDetail;
//# sourceMappingURL=api.js.map
