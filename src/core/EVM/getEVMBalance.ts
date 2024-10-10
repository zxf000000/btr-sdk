import type { Address } from "viem";
import { formatUnits } from "viem";
import { balanceOfAbi } from "./abi.js";
import { getPublicClient } from "./publicClient.js";
import type { Token, TokenAmount } from "../../types/base.js";
import { AddressZero } from "../../utils/constants.js";
import * as _ from "lodash";

export const getEVMBalance = async (
  walletAddress: string,
  tokens: Token[],
): Promise<TokenAmount[]> => {
  if (tokens.length === 0) {
    return [];
  }
  const { chainId } = tokens[0];
  tokens.forEach((token) => {
    if (token.chainId !== chainId) {
      console.warn(`Requested tokens have to be on the same chain.`);
    }
  });

  const client = await getPublicClient(Number(chainId));
  const res = (await Promise.all(
    tokens.map((token) => {
      if (token.address === AddressZero) {
        return client
          .getBalance({
            address: walletAddress as Address,
          })
          .then((balance) => {
            return balance;
          });
      }
      return client.readContract({
        abi: balanceOfAbi,
        address: token.address as Address,
        args: [walletAddress as Address],
        functionName: "balanceOf",
      });
    }),
  )) as bigint[];
  return _.zipWith(tokens, res, (token: Token, balance: bigint) => {
    return {
      amount: `${balance}`,
      formatted: formatUnits(balance as bigint, token.decimals || 18),
      decimals: token.decimals || 18,
      symbol: token.symbol,
      address: token.address,
    };
  });
};
