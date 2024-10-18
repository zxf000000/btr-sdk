import type { Token, TokenAmount } from "../../types/index.js";
import { getTronClient } from "./getTronClient.js";
import Trc20Abi from "./abi.js";
import * as _ from "lodash";
import { formatUnits } from "viem";

export const TRX_ADDRESS = "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb";

export const getTronBalance = async (
  walletAddress: string,
  tokens: Token[],
): Promise<TokenAmount[]> => {
  if (!walletAddress) {
    return [];
  }
  const tronClient = getTronClient();
  const calls = tokens.map((token) => {
    if (token.address === TRX_ADDRESS) {
      return tronClient.trx.getBalance(walletAddress);
    }
    const contract = tronClient.contract(Trc20Abi, token.address);
    return contract.methods.balanceOf(walletAddress).call();
  });
  tronClient.setAddress(walletAddress);
  const balances = (await Promise.all(calls)) as any;
  return _.zipWith(tokens, balances, (token: Token, balance: string) => {
    return {
      amount: `${balance}`,
      formatted: formatUnits(BigInt(balance || 0), token.decimals || 18),
      decimals: token.decimals || 18,
      symbol: token.symbol,
      address: token.address,
    };
  });
};
