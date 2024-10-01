
import IconButton from "@mui/material/IconButton";
import { X } from "@untitled-ui/icons-react";
import { useSnackbar } from "notistack";

export function SnackbarCloseButton({
  snackbarKey,
}: {
  snackbarKey: string | number;
}) {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton
      sx={{ color: "#FFFFFF" }}
      onClick={() => {
        closeSnackbar(snackbarKey);
      }}
    >
      <X />
    </IconButton>
  );
}
