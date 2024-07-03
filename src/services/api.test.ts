import { getChains, getTokensForNetwork } from "./api";
import { expect, test, describe, it } from "vitest";

describe("getChains", () => {
  it("should return none empty chains", async () => {
    const chains = await getChains();
    expect(chains.length).toBeGreaterThan(0);
  });
});

describe("getTokensForNetwork", () => {
  it("should return tokens for a valid network", async () => {
    const tokenResult = await getTokensForNetwork({ network: "ethereum" });
    expect(tokenResult.count).toBeGreaterThan(0);
    expect(tokenResult.results.length).toBeGreaterThan(0);
  });

  it("should handle network with no tokens", async () => {
    const tokenResult = await getTokensForNetwork({ network: "invalid" });
    expect(tokenResult.count).toBe(0);
    expect(tokenResult.results.length).toBe(0);
  });
});
