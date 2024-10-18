import type { Token, TokenAmount } from "../../types/index.js";
import * as _ from "lodash";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { JettonMaster, TonClient } from "@ton/ton";
import { Address as TonAddress } from "@ton/core";
import { AddressZero } from "../../utils/constants.js";
import { formatUnits } from "viem";

const sleep = async (time: number) => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time * 1000);
  });
};

export async function getTonBalance(
  walletAddress: string,
  tokens: Token[],
): Promise<TokenAmount[]> {
  const address = TonAddress.parse(walletAddress);
  const tonClient = await getHttpEndpoint().then((endpoint) => {
    return new TonClient({
      endpoint,
    });
  });

  const res: bigint[] = [];
  for (let token of tokens) {
    if (token.address === AddressZero) {
      const balance = await tonClient.getBalance(address);
      res.push(balance);
      await sleep(1);
      continue;
    }
    const JettonMasterAddress = TonAddress.parse(token.address);
    const jettonMaster = tonClient.open(
      JettonMaster.create(JettonMasterAddress),
    );
    const userTokenAddress = await jettonMaster.getWalletAddress(address);
    await sleep(1);
    const value = await tonClient
      .runMethod(userTokenAddress, "get_wallet_data")
      .then((result) => {
        const value = result.stack.pop();
        return (value as any).value;
      })
      .catch((e) => {
        console.log(e, "error");
        return "0";
      });
    await sleep(1);

    res.push(BigInt(value));
  }

  return _.zipWith(tokens, res, (token, balance) => {
    return {
      ...token,
      amount: balance.toString(),
      formatted: formatUnits(balance, token.decimals || 18),
    };
  });
}
