export function isAddress(address: string): boolean {
  const accountIdRegex = /^(([a-z0-9_-]{2,64})|([a-f0-9]{64}))(\.near)?$/;
  return accountIdRegex.test(address);
}
