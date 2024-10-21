import { connect, keyStores } from "near-api-js";
import butterConfig from "../../config/index.js";
import { ChainType } from "../../types/index.js";

export async function getNearConnection() {
  return await connect({
    networkId: "mainnet",
    nodeUrl:
      butterConfig.rpcs?.[ChainType.NEAR]?.[0] ||
      "https://rpc.mainnet.near.org",
    walletUrl: "https://mainnet.mynearwallet.com/",
    helperUrl: "https://helper.mainnet.near.org",
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  });
}
