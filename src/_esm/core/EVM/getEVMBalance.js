import { formatUnits } from "viem";
import { balanceOfAbi } from "./abi.js";
import { getPublicClient } from "./publicClient.js";
import { AddressZero } from "../../utils/constants.js";
import * as _ from "lodash";
export const getEVMBalance = async (walletAddress, tokens) => {
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
  const res = await Promise.all(
    tokens.map((token) => {
      if (token.address === AddressZero) {
        return client
          .getBalance({
            address: walletAddress,
          })
          .then((balance) => {
            return balance;
          });
      }
      return client.readContract({
        abi: balanceOfAbi,
        address: token.address,
        args: [walletAddress],
        functionName: "balanceOf",
      });
    }),
  );
  return _.zipWith(tokens, res, (token, balance) => {
    return {
      amount: `${balance}`,
      formatted: formatUnits(balance, token.decimals || 18),
      decimals: token.decimals || 18,
      symbol: token.symbol,
      address: token.address,
    };
  });
};
//# sourceMappingURL=getEVMBalance.js.map
