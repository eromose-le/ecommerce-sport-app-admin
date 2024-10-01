import { useSelector } from "react-redux";
import { User } from "@/types/user";

function useAuthUser(): User {
  const authUser = useSelector((state: any) => state?.global?.authUser);

  return authUser
    ? {
        ...authUser,
      }
    : null;
}

export default useAuthUser;
