import { FC } from "react";
import SportygalaxyLoadingIndicator from "./SportygalaxyLoadingIndicator";


interface AppLoaderProps {}

const AppLoader: FC<AppLoaderProps> = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-4">
      <SportygalaxyLoadingIndicator />
    </div>
  );
};

export default AppLoader;
