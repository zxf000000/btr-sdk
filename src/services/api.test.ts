import { getChains } from "./api";
import { expect, test, describe } from "vitest";

describe("get chains", () => {
  test("all chains", async () => {
    const chains = await getChains();
    expect(chains.length).toBeGreaterThan(0);
  });
});

describe("get tokens for chains", () => {});
