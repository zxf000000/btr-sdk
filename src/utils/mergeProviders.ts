import type { ButterSDKProvider } from "../types/provider.js";

export function mergeProviders(
  arr1: ButterSDKProvider[],
  arr2: ButterSDKProvider[],
): ButterSDKProvider[] {
  const map = new Map<string, ButterSDKProvider>();

  arr1.forEach((item) => {
    map.set(item.providerType, item);
  });

  arr2.forEach((item) => {
    map.set(item.providerType, item);
  });

  return Array.from(map.values());
}
