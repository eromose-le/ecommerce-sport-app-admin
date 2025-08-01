import { FC } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useExtendedSnackbar from "@/hooks/useExtendedSnackbar";
import { LoadingButton } from "@mui/lab";
import { X } from "@untitled-ui/icons-react";
import { ApiProductStoreSlice } from "@/api/ApiProductStoreSlice";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";

const validationSchema = Yup.object({});

interface ProductDeactivateButtonProps {
  productId: string;
  disable?: boolean;
}
const ProductDeactivateButton: FC<ProductDeactivateButtonProps> = ({
  productId,
  disable,
}) => {
  const confirm = useConfirmDialog();
  const { showSuccessSnackbar, showErrorSnackbar } = useExtendedSnackbar();
  const [deactivateProduct, deactivateProductResult] =
    ApiProductStoreSlice.useDeactivateProductMutation();

  const formik = useFormik({
    initialValues: {},
    validationSchema,
    onSubmit: async () => {
      try {
        const payload = {
          id: productId || "",
        };

        const data = await deactivateProduct(payload).unwrap();
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
        "You are trying to deactivate this product, this action is irreversable",
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
      loading={deactivateProductResult.isLoading}
      startIcon={<X width={18} height={18} />}
      onClick={() => handleReject()}
    >
      Deactivate
    </LoadingButton>
  );
};

export default ProductDeactivateButton;
