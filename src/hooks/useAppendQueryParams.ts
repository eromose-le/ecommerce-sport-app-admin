import { useLocation, useNavigate } from "react-router-dom";

export function useAppendQueryParams() {
  const location = useLocation();
  const navigate = useNavigate();

  const appendParams = (params: Record<string, string | number | boolean>) => {
    const searchParams = new URLSearchParams(location.search);

    Object.entries(params).forEach(([key, value]) => {
      searchParams.set(key, String(value));
    });

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: false,
    });
  };

  const clearParams = () => {
    navigate(location.pathname, { replace: false });
  };

  return { appendParams, clearParams };
}
