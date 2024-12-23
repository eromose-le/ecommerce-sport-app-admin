import ConfirmContext from "@/common/ConfirmDialog/ConfirmDialogContext";
import { HandleConfirm } from "@/common/ConfirmDialog/ConfirmDialogTypes";

import React from "react";

export const useConfirmDialog = (): HandleConfirm => {
  const confirm = React.useContext(ConfirmContext);

  if (!confirm) {
    throw new Error(
      "useConfirmDialog must be used within a ConfirmDialogProvider"
    );
  }

  return confirm;
};
