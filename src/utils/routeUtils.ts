/**
 * Extract values from route params.
 * If a value exists in `searchParams`, it will override the default in `params`.
 *
 * @template T - A type that represents the structure of the params object.
 * @param {URLSearchParams} searchParams - The search params extracted from the URL.
 * @param {T} params - The default params that may be overridden by searchParams.
 * @returns {T} - An object containing the extracted values or defaults.
 */
export function urlSearchParamsExtractor<T extends Record<string, any>>(
  searchParams: URLSearchParams,
  params: T
): T {
  const result: Record<string, any> = { ...params }; // Use a mutable type for the result

  if (searchParams && params) {
    Object.keys(params).forEach((key) => {
      const value = searchParams.get(key);
      if (value !== null) {
        result[key] = value;
      }
    });
  }

  return result as T; // Cast result back to T
}
