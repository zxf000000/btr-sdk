export function mergeProviders(arr1, arr2) {
  const map = new Map();
  arr1.forEach((item) => {
    map.set(item.providerType, item);
  });
  arr2.forEach((item) => {
    map.set(item.providerType, item);
  });
  return Array.from(map.values());
}
//# sourceMappingURL=mergeProviders.js.map
