import { FC } from "react";
import sportygalaxyLogo from "/sportygalaxy-logo.svg";

interface SportygalaxyLoadingIndicatorProps {}

const SportygalaxyLoadingIndicator: FC<SportygalaxyLoadingIndicatorProps> = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <img src={sportygalaxyLogo} className="logo" alt="sportygalaxy-logo" />
      <span id="loading-indicator"></span>
    </div>
  );
};

export default SportygalaxyLoadingIndicator;
