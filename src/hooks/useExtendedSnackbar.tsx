import { DEFAULT_SNACKBAR_DURATION } from "@/constants/AppConstants";
import { type SnackbarMessage, useSnackbar } from "notistack";


const useExtendedSnackbar = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showSuccessSnackbar = (
    message: SnackbarMessage,
    autoHideDuration = DEFAULT_SNACKBAR_DURATION
  ) => {
    return enqueueSnackbar(message, {
      variant: "success",
      autoHideDuration,
    });
  };

  const showErrorSnackbar = (
    message: SnackbarMessage,
    autoHideDuration = DEFAULT_SNACKBAR_DURATION
  ) => {
    return enqueueSnackbar(message, {
      variant: "error",
      autoHideDuration,
    });
  };

  const showWarningSnackbar = (
    message: SnackbarMessage,
    autoHideDuration = DEFAULT_SNACKBAR_DURATION
  ) => {
    return enqueueSnackbar(message, {
      variant: "warning",
      autoHideDuration,
    });
  };

  return {
    enqueueSnackbar,
    closeSnackbar,
    showSuccessSnackbar,
    showErrorSnackbar,
    showWarningSnackbar,
  };
};

export default useExtendedSnackbar;
