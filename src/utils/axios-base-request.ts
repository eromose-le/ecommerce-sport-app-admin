import { AxiosInstance, AxiosRequestConfig } from "axios";
import { SerializedError } from "@reduxjs/toolkit"; // Assuming you're using Redux Toolkit

/**
 *
 * @param {import("axios").AxiosRequestConfig} baseConfig
 */
export default function axiosBaseQuery(
  baseConfig: AxiosRequestConfig,
  http: AxiosInstance
) {
  /**
   *
   * @param {import("axios").AxiosRequestConfig} config
   */
  async function request(config: AxiosRequestConfig) {
    const url = config.url
      ? (baseConfig.url || "") + config.url
      : baseConfig.url;
    try {
      const response = await http.request({ ...baseConfig, ...config, url });

      return {
        data: response.data || null,
        meta: { request: response.request, response },
      };
    } catch (error: any) {
      const processedError = handleError(error);

      return {
        error: {
          message: "",
          defaultUserMessage: processedError,
          status: error?.response?.status || undefined,
          data: error?.response?.data || null,
        },
      };
    }
  }
  return request;
}

// Error handling utility function
function handleError(error: any) {
  // Check if error is of the custom type that contains `data` property
  if (isCustomError(error)) {
    const userMessage =
      (error.data as any)?.defaultUserMessage || "Error occurred";
    console.log(userMessage);
    return userMessage;
  } else {
    const serializedErrorMessage =
      (error as SerializedError).message || "Unknown error occurred";
    console.log(serializedErrorMessage);
    return serializedErrorMessage;
  }
}

// Type guard to check if error is of the custom type
function isCustomError(
  error: any
): error is { defaultUserMessage: any; status: any; data: any } {
  return error && typeof error === "object" && "data" in error;
}
