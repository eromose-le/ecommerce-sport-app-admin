import { FC } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useExtendedSnackbar from "@/hooks/useExtendedSnackbar";
import { LoadingButton } from "@mui/lab";
import { X } from "@untitled-ui/icons-react";
import { ApiProductStoreSlice } from "@/api/ApiProductStoreSlice";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";

const validationSchema = Yup.object({});

interface ProductDeleteButtonProps {
  productId: string;
  disable?: boolean;
}
const ProductDeleteButton: FC<ProductDeleteButtonProps> = ({
  productId,
  disable,
}) => {
  const confirm = useConfirmDialog();
  const { showSuccessSnackbar, showErrorSnackbar } = useExtendedSnackbar();
  const [deleteProduct, deleteProductResult] =
    ApiProductStoreSlice.useDeleteProductMutation();

  const formik = useFormik({
    initialValues: {},
    validationSchema,
    onSubmit: async () => {
      try {
        const payload = {
          id: productId || "",
        };

        const data = await deleteProduct(payload).unwrap();
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
        "You are trying to delete this product, this action is irreversable",
      onConfirm: () => {
        formik.handleSubmit();
      },
      dialogProps: {
        maxWidth: "xs",
      },
      confirmButtonProps: { color: "error", variant: "contained-error" },
    });
  };

  const isDisableBtn = !productId;

  return (
    <LoadingButton
      disabled={disable || isDisableBtn}
      className="capitalize font-semibold text-base font-inter md:px-10"
      variant="contained-error"
      loading={deleteProductResult.isLoading}
      startIcon={<X width={18} height={18} />}
      onClick={() => handleReject()}
    >
      Delete
    </LoadingButton>
  );
};

export default ProductDeleteButton;
