import { type ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { routeEnum } from "@/constants/RouteConstants";
import useAuthUser from "@/hooks/useAuthUser";

interface AuthGuardProps {
  component: ReactElement;
  route: any;
}

// PS: This can be extended as we see fit
function AuthGuard({ component }: AuthGuardProps): ReactElement {
  const location = useLocation();

  const user = useAuthUser();
  const isAuthorized = !!user?.token;

  if (!isAuthorized) {
    return (
      <Navigate
        state={{ prevLocation: location }}
        to={routeEnum.LOGIN}
        replace
      />
    );
  }

  return component;
}

export default AuthGuard;
