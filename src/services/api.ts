import { request } from "./request";
import { baseConfig } from "../macros/base-config";
import {
  Chain,
  ChainsResponse,
  ResponseChainItem,
  TokensResponse,
} from "../types";
import { GetTokensForNetworkProps } from "../types/request";

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
