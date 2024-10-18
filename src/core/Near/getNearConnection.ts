import { connect, keyStores } from "near-api-js";

export async function getNearConnection() {
  return await connect({
    networkId: "mainnet",
    nodeUrl: "https://rpc.mainnet.near.org",
    walletUrl: "https://mainnet.mynearwallet.com/",
    helperUrl: "https://helper.mainnet.near.org",
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  });
}
