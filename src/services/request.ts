import type { ApiResponse } from "../types/index.js";

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
    if (data.errno !== undefined && data.errno !== 0) {
      throw new Error(data.message);
    }
    return data;
  } catch (e) {
    throw e;
  }
};
