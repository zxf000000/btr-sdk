import type { ButterSDKProvider } from "../../types/provider.js";
import type { Action } from "./actions.js";
import { providers } from "near-api-js";

export interface NearProviderOptions {
  getWallet?: () => Promise<NearWallet>;
}

export interface NearProvider extends ButterSDKProvider {
  setOptions(options: NearProviderOptions): void;
}

interface SignAndSendTransactionParams {
  /**
   * Account ID used to sign the transaction. Defaults to the first account.
   */
  signerId?: string;
  /**
   * Account ID to receive the transaction. Defaults to `contractId` defined in `init`.
   */
  receiverId?: string;
  /**
   * NEAR Action(s) to sign and send to the network (e.g. `FunctionCall`). You can find more information on `Action` {@link https://github.com/near/wallet-selector/blob/main/packages/core/docs/api/transactions.md | here}.
   */
  actions: Array<Action>;
}

export interface SignedMessage {
  accountId: string;
  publicKey: string;
  signature: string;
  state?: string;
}

interface NearWallet {
  signAndSendTransaction(
    params: SignAndSendTransactionParams,
  ): Promise<providers.FinalExecutionOutcome>;
}
