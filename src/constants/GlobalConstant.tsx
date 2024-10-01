export const ENVIRONMENTS = {
  local: "local",
  development: "development",
  staging: "staging",
  production: "production",
};

export const defaultGlobalConfirmDialogOptions = {
  confirmButtonText: "Confirm",
  cancelButtonText: "Cancel",
  confirmButtonProps: {
    color: "error",
  },
  cancelButtonProps: {
    color: "primary",
    variant: "outlined",
    autoFocus: true,
  },
};