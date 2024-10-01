import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../store/storeActions";
import useAuthUser from "./useAuthUser";
import { routeEnum } from "@/constants/RouteConstants";

function useLogout(): { logout: () => void } {
  const authUser = useAuthUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = useCallback(
    async function logout() {
      try {
        //
      } catch (error) {
        //
      } finally {
        dispatch(logoutAction());
        navigate(routeEnum.LOGIN);
      }
    },

    [authUser?.user, authUser?.user?.id, authUser?.token, dispatch, navigate]
  );

  return { logout };
}

export default useLogout;
