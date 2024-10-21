import {
  generateSwapData,
  getChains,
  getRoutes,
  getSwapHistory,
  getTokensForNetwork,
} from "./api.js";
import { expect, describe, it } from "vitest";

describe("getChains", () => {
  it("should return none empty chains", async () => {
    const chains = await getChains();
    expect(chains.length).toBeGreaterThan(0);
  });
});

describe("getTokensForNetwork", () => {
  it(
    "should return tokens for a valid network",
    async () => {
      const tokenResult = await getTokensForNetwork({ network: "ethereum" });
      expect(tokenResult.count).toBeGreaterThan(0);
      expect(tokenResult.results.length).toBeGreaterThan(0);
    },
    {
      timeout: 30000,
    },
  );

  it(
    "should handle network with no tokens",
    async () => {
      const tokenResult = await getTokensForNetwork({ network: "invalid" });
      expect(tokenResult.count).toBe(0);
      expect(tokenResult.results.length).toBe(0);
    },
    {
      timeout: 30000,
    },
  );
});

describe("getRoutes", () => {
  it(
    "should return routes for a valid network",
    async () => {
      const routes = await getRoutes({
        fromChainId: "1",
        toChainId: "56",
        amount: "1",
        tokenInAddress: "0x0000000000000000000000000000000000000000",
        tokenOutAddress: "0x0000000000000000000000000000000000000000",
        slippage: "500",
      });
      expect(routes.length).toBeGreaterThan(0);
    },
    {
      timeout: 30000,
    },
  );
});

describe("generateSwapData", async () => {
  it(
    "should return valid tx data",
    async () => {
      const routes = await getRoutes({
        fromChainId: "1",
        toChainId: "56",
        amount: "1",
        tokenInAddress: "0x0000000000000000000000000000000000000000",
        tokenOutAddress: "0x0000000000000000000000000000000000000000",
        slippage: "500",
      });
      const swapData = await generateSwapData({
        hash: routes[0].hash,
        slippage: "500",
        receiver: "0x75B851a27D7101438F45fce31816501193239A83",
        from: "0x75B851a27D7101438F45fce31816501193239A83",
      });
      expect(swapData.length).toBeGreaterThan(0);
    },
    {
      timeout: 30000,
    },
  );
});

describe("getSwapHistory", async () => {
  it("should return swap history", async () => {
    const result = await getSwapHistory({
      page: 1,
      size: 10,
      sourceAddress: "",
    });
    expect(result.total).toBeGreaterThan(0);
  });
});

// describe("getSwapHistoryDetail", () => {
//   it("should return valid data", async () => {
//     const result = await getSwapHistoryDetail({
//       id: "",
//     });
//     expect(result?.sourceHash).toBe(
//       "0xdf11d3e99962940d48000eaaef8fd4f2fae965d8834f0bdba3239d3a38ec157b",
//     );
//   });
// });
