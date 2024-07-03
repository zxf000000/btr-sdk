import { ApiResponse } from "../types";

export const request = async <T>(
  url: URL | RequestInfo,
  options: RequestInit = {},
) => {
  try {
    const response: Response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data: ApiResponse<T> = await response.json();
    return data;
  } catch (e) {
    throw e;
  }
};
