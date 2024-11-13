"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_js_1 = require("./api.js");
const vitest_1 = require("vitest");
(0, vitest_1.describe)("getChains", () => {
  (0, vitest_1.it)("should return none empty chains", async () => {
    const chains = await (0, api_js_1.getChains)();
    (0, vitest_1.expect)(chains.length).toBeGreaterThan(0);
  });
});
(0, vitest_1.describe)("getTokensForNetwork", () => {
  (0, vitest_1.it)(
    "should return tokens for a valid network",
    async () => {
      const tokenResult = await (0, api_js_1.getTokensForNetwork)({
        network: "ethereum",
      });
      (0, vitest_1.expect)(tokenResult.count).toBeGreaterThan(0);
      (0, vitest_1.expect)(tokenResult.results.length).toBeGreaterThan(0);
    },
    {
      timeout: 30000,
    },
  );
  (0, vitest_1.it)(
    "should handle network with no tokens",
    async () => {
      const tokenResult = await (0, api_js_1.getTokensForNetwork)({
        network: "invalid",
      });
      (0, vitest_1.expect)(tokenResult.count).toBe(0);
      (0, vitest_1.expect)(tokenResult.results.length).toBe(0);
    },
    {
      timeout: 30000,
    },
  );
});
(0, vitest_1.describe)("getRoutes", () => {
  (0, vitest_1.it)(
    "should return routes for a valid network",
    async () => {
      const routes = await (0, api_js_1.getRoutes)({
        fromChainId: "1",
        toChainId: "56",
        amount: "1",
        tokenInAddress: "0x0000000000000000000000000000000000000000",
        tokenOutAddress: "0x0000000000000000000000000000000000000000",
        slippage: "500",
      });
      (0, vitest_1.expect)(routes.length).toBeGreaterThan(0);
    },
    {
      timeout: 30000,
    },
  );
});
(0, vitest_1.describe)("generateSwapData", async () => {
  (0, vitest_1.it)(
    "should return valid tx data",
    async () => {
      const routes = await (0, api_js_1.getRoutes)({
        fromChainId: "1",
        toChainId: "56",
        amount: "1",
        tokenInAddress: "0x0000000000000000000000000000000000000000",
        tokenOutAddress: "0x0000000000000000000000000000000000000000",
        slippage: "500",
      });
      const swapData = await (0, api_js_1.generateSwapData)({
        hash: routes[0].hash,
        slippage: "500",
        receiver: "0x75B851a27D7101438F45fce31816501193239A83",
        from: "0x75B851a27D7101438F45fce31816501193239A83",
      });
      (0, vitest_1.expect)(swapData.length).toBeGreaterThan(0);
    },
    {
      timeout: 30000,
    },
  );
});
(0, vitest_1.describe)("getSwapHistory", async () => {
  (0, vitest_1.it)("should return swap history", async () => {
    const result = await (0, api_js_1.getSwapHistory)({
      page: 1,
      size: 10,
      sourceAddress: "",
    });
    (0, vitest_1.expect)(result.total).toBeGreaterThan(0);
  });
});
//# sourceMappingURL=api.test.js.map
