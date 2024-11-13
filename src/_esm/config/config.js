import { getChains } from "../services/api.js";
import { mergeProviders } from "../utils/mergeProviders.js";
class ButterSDKConfig {
  constructor() {
    Object.defineProperty(this, "apiUrl", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0,
    });
    Object.defineProperty(this, "routeApiUrl", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0,
    });
    Object.defineProperty(this, "historyApiUrl", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0,
    });
    Object.defineProperty(this, "version", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0,
    });
    Object.defineProperty(this, "providers", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0,
    });
    Object.defineProperty(this, "chains", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: [],
    });
    Object.defineProperty(this, "rpcs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0,
    });
    Object.defineProperty(this, "loading", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined,
    });
    this.apiUrl = "https://bs-tokens-api.chainservice.io";
    this.routeApiUrl = "https://bs-router-v3.chainservice.io";
    this.historyApiUrl = "https://bs-app-api.chainservice.io";
    this.version = "";
    this.providers = [];
    this.rpcs = {};
  }
  static getInstance() {
    if (!ButterSDKConfig.instance) {
      ButterSDKConfig.instance = new ButterSDKConfig();
    }
    return ButterSDKConfig.instance;
  }
  setOptions(options) {
    this.apiUrl = options.apiUrl || this.apiUrl;
    this.historyApiUrl = options.historyApiUrl || this.historyApiUrl;
    this.routeApiUrl = options.routeApiUrl || this.routeApiUrl;
    this.providers = mergeProviders(this.providers, options.providers);
    this.rpcs = options.rpcs || this.rpcs;
    this.loadChains();
  }
  async getChainById(chainId) {
    if (this.loading) {
      await this.loading;
    }
    return this.chains.find((chain) => `${chain.chainId}` === `${chainId}`);
  }
  loadChains() {
    this.loading = getChains()
      .then((chains) => {
        this.chains = chains;
      })
      .catch();
  }
}
const butterConfig = ButterSDKConfig.getInstance();
export default butterConfig;
//# sourceMappingURL=config.js.map
