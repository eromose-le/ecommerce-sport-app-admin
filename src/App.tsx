import { Suspense } from "react";
import AppLoader from "./common/Loading/AppLoader";
import AppRouter from "./router";
import { SnackbarProvider } from "notistack";
import { SnackbarCloseButton } from "./common/SnackbarCloseButton";
import ConfirmDialogProvider from "./common/ConfirmDialog/ConfirmDialogProvider";

function App() {
  return (
    <>
      <ConfirmDialogProvider>
        <SnackbarProvider
          classes={{ containerRoot: "z-alert" }}
          action={(snackbarKey) => (
            <SnackbarCloseButton snackbarKey={snackbarKey} />
          )}
          preventDuplicate
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Suspense fallback={<AppLoader />}>
            <AppRouter />
          </Suspense>
        </SnackbarProvider>
      </ConfirmDialogProvider>
    </>
  );
}

export default App;
