import type { Token, TokenAmount } from "../../types/index.js";

export function getTonBalance(
  walletAddress: string,
  tokens: Token[],
): Promise<TokenAmount[]> {
  console.log(walletAddress);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        tokens.map((token) => {
          return {
            ...token,
            amount: "0",
            formatted: "0",
          };
        }),
      );
    }, 1000);
  });
}
