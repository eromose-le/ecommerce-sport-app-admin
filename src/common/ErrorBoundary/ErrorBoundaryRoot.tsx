import { useRouteError } from "react-router-dom";
import ErrorDialog from "./ErrorDialog";

const ERROR_MESSAGE = "dynamically imported module";

export default function ErrorBoundaryRoot() {
  const error = useRouteError() as any;

  const handleReload = () => {
    window.location.reload();
  };

  if (
    error?.message &&
    (error.message as string)
      .toLocaleLowerCase()
      .includes(ERROR_MESSAGE.toLocaleLowerCase())
  ) {
    handleReload();
  }

  return <ErrorDialog onRetry={handleReload} />;
}
