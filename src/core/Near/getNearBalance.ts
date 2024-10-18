import type { Token, TokenAmount } from "../../types/index.js";
import { getNearConnection } from "./getNearConnection.js";
import { AddressZero } from "../../utils/constants.js";
import * as _ from "lodash";
import { formatUnits } from "viem";

export async function getNearBalance(
  walletAddress: string,
  tokens: Token[],
): Promise<TokenAmount[]> {
  if (!walletAddress) {
    return [];
  }
  const connection = await getNearConnection();
  const account = await connection?.account(walletAddress);
  account.getAccountBalance().then((res) => res.available);
  const calls = tokens.map((token) => {
    if (token.address === AddressZero) {
      return account.getAccountBalance().then((res) => res.available);
    }
    return account.viewFunction({
      contractId: token.address,
      methodName: "ft_balance_of",
      args: {
        account_id: walletAddress,
      },
    });
  });
  const balances = await Promise.all(calls);
  return _.zipWith(tokens, balances, (token, balance) => {
    return {
      amount: `${balance}`,
      formatted: formatUnits(balance as bigint, token.decimals || 18),
      decimals: token.decimals || 18,
      symbol: token.symbol,
      address: token.address,
    };
  });
}
