import { FC } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useExtendedSnackbar from "@/hooks/useExtendedSnackbar";
import { LoadingButton } from "@mui/lab";
import { X } from "@untitled-ui/icons-react";
import { ApiOrderStoreSlice } from "@/api/ApiOrderStoreSlice";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";

const validationSchema = Yup.object({});

interface OrderDeleteButtonProps {
  orderId: string;
  disable?: boolean;
}
const OrderDeleteButton: FC<OrderDeleteButtonProps> = ({
  orderId,
  disable,
}) => {
  const confirm = useConfirmDialog();
  const { showSuccessSnackbar, showErrorSnackbar } = useExtendedSnackbar();
  const [deleteOrder, deleteOrderResult] =
    ApiOrderStoreSlice.useDeleteOrderMutation();

  const formik = useFormik({
    initialValues: {},
    validationSchema,
    onSubmit: async () => {
      try {
        const payload = {
          id: orderId || "",
        };

        const data = await deleteOrder(payload).unwrap();
        showSuccessSnackbar(data?.message || "Successful");
      } catch (error: any) {
        showErrorSnackbar(error?.data?.message || "Error occured");
      }
    },
  });

  const handleReject = () => {
    confirm({
      title: "Are you sure?",
      description:
        "You are trying to delete this order, this action is irreversable",
      onConfirm: () => {
        formik.handleSubmit();
      },
      dialogProps: {
        maxWidth: "xs",
      },
      confirmButtonProps: { color: "error", variant: "contained-error" },
    });
  };

  const isDisableBtn = !orderId;

  return (
    <LoadingButton
      disabled={disable || isDisableBtn}
      className="capitalize font-semibold text-base font-inter md:px-10"
      variant="contained-error"
      loading={deleteOrderResult.isLoading}
      startIcon={<X width={18} height={18} />}
      onClick={() => handleReject()}
    >
      Delete
    </LoadingButton>
  );
};

export default OrderDeleteButton;
