import type { ButterSDKConfigOptions } from "../types/config.js";
import type { Chain } from "../types/base.js";
import { getChains } from "../services/api.js";
import type { ButterSDKProvider } from "../types/provider.js";

class ButterSDKConfig {
  private static instance: ButterSDKConfig;
  public apiUrl: string;
  public routeApiUrl: string;
  public historyApiUrl: string;
  public version: string;
  public providers: ButterSDKProvider[];
  public chains: Chain[] = [];

  public loading: Promise<void> | undefined = undefined;

  private constructor() {
    this.apiUrl = "https://bs-tokens-api.chainservice.io";
    this.routeApiUrl = "https://bs-router-v3.chainservice.io";
    this.historyApiUrl = "https://bs-app-api.chainservice.io";
    this.version = "";
    this.providers = [];
  }

  public static getInstance() {
    if (!ButterSDKConfig.instance) {
      ButterSDKConfig.instance = new ButterSDKConfig();
    }
    return ButterSDKConfig.instance;
  }

  public setOptions(options: ButterSDKConfigOptions) {
    this.apiUrl = options.apiUrl || this.apiUrl;
    this.historyApiUrl = options.historyApiUrl || this.historyApiUrl;
    this.routeApiUrl = options.routeApiUrl || this.routeApiUrl;
    this.providers = [...this.providers, ...options.providers];
    this.loadChains();
  }

  public async getChainById(chainId: number) {
    if (this.loading) {
      await this.loading;
    }
    return this.chains.find((chain) => `${chain.chainId}` === `${chainId}`);
  }

  private loadChains() {
    this.loading = getChains()
      .then((chains) => {
        this.chains = chains;
      })
      .catch();
  }
}

const butterConfig = ButterSDKConfig.getInstance();

export default butterConfig;
