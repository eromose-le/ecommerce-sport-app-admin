import { RouterProvider, createBrowserRouter } from "react-router-dom";

import appRoutes from "./routes";
import AppLoader from "@/common/Loading/AppLoader";

const router = createBrowserRouter(appRoutes);

function AppRouter() {
  return <RouterProvider router={router} fallbackElement={<AppLoader />} />;
}

export default AppRouter;
