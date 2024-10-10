import { AddressZero, AlternativeAddressZero } from "./constants";

export const isZeroAddress = (address: string): boolean => {
  return address === AddressZero || address === AlternativeAddressZero;
};
