import { FC } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useExtendedSnackbar from "@/hooks/useExtendedSnackbar";
import { LoadingButton } from "@mui/lab";
import { CheckDone01 } from "@untitled-ui/icons-react";
import { ApiProductStoreSlice } from "@/api/ApiProductStoreSlice";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";

const validationSchema = Yup.object({});

interface ProductReactivateButtonProps {
  productId: string;
  disable?: boolean;
}
const ProductReactivateButton: FC<ProductReactivateButtonProps> = ({
  productId,
  disable,
}) => {
  const confirm = useConfirmDialog();
  const { showSuccessSnackbar, showErrorSnackbar } = useExtendedSnackbar();
  const [reactivateProduct, reactivateProductResult] =
    ApiProductStoreSlice.useReactivateProductMutation();

  const formik = useFormik({
    initialValues: {},
    validationSchema,
    onSubmit: async () => {
      try {
        const payload = {
          id: productId || "",
        };

        const data = await reactivateProduct({
          isDelete: false,
          ...payload,
        }).unwrap();
        showSuccessSnackbar(data?.message || "Successful");
      } catch (error: any) {
        showErrorSnackbar(error?.data?.message || "Error occured");
      }
    },
  });

  const handleReject = () => {
    confirm({
      title: "Are you sure?",
      description: "You are trying to reactivate this product",
      onConfirm: () => {
        formik.handleSubmit();
      },
      dialogProps: {
        maxWidth: "xs",
      },
      confirmButtonProps: { color: "success", variant: "contained" },
    });
  };

  const isDisableBtn = !productId;

  return (
    <LoadingButton
      disabled={!disable || isDisableBtn}
      className="capitalize font-semibold text-base font-inter md:px-10"
      variant="contained"
      loading={reactivateProductResult.isLoading}
      startIcon={<CheckDone01 width={18} height={18} />}
      onClick={() => handleReject()}
    >
      Re-activate
    </LoadingButton>
  );
};

export default ProductReactivateButton;
