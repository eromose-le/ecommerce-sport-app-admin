import { useLocation, useNavigate } from "react-router-dom";

type QueryParamsObject = Record<string, string | number | boolean | Date | null>;

// Hook for managing query parameters
export function useQueryParam() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  // ---- GET ----
  const get = (param?: string): string | Record<string, string> | null => {
    if (param) {
      return searchParams.get(param);
    }
    const allParams: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      allParams[key] = value;
    });
    return allParams;
  };

  // ---- ADD / UPDATE ----
  const set = (params: QueryParamsObject, replace = true) => {
    const updatedParams = new URLSearchParams(location.search);
    Object.entries(params).forEach(([key, value]) => {
      updatedParams.set(key, String(value));
    });
    navigate(
      {
        pathname: location.pathname,
        search: updatedParams.toString(),
      },
      { replace }
    );
  };

  // ---- REMOVE ----
  const remove = (paramsToRemove: string | string[], replace = true) => {
    const updatedParams = new URLSearchParams(location.search);
    const keys = Array.isArray(paramsToRemove)
      ? paramsToRemove
      : [paramsToRemove];
    keys.forEach((key) => {
      updatedParams.delete(key);
    });
    navigate(
      {
        pathname: location.pathname,
        search: updatedParams.toString(),
      },
      { replace }
    );
  };

  return { get, set, remove };
}

// USAGE
// const { get, set, remove } = useQueryParams();
// <p>Current page: {get("page")}</p>
// <button onClick={() => set({ page: 5, sort: "asc" })}> Set page & sort </button>
// <button onClick={() => remove("page")}> Remove page </button>
// <button onClick={() => remove(["page", "sort"])}> Remove page & sort </button>
