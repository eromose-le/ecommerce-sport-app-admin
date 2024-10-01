import { FC } from "react";
import MenuDropdown from "./common/Menu";
import useFirstFollowUpPath from "./hooks/useFirstFollowUpPath";

interface AppProtectedHeaderProps {}
const AppProtectedHeader: FC<AppProtectedHeaderProps> = () => {
  const firstFollowUpPath = useFirstFollowUpPath();
  return (
    <div className="container-wrapper flex items-center justify-start bg-[#F2F4F7] pb-[19px] pt-[30px] gap-6">
      <p className="text-black font-bold font-crimson text-3xl mr-auto capitalize">
        {firstFollowUpPath ?? ""}
      </p>
      <div className="flex items-center justify-end w-full">
        <MenuDropdown />
      </div>
    </div>
  );
};

export default AppProtectedHeader;
