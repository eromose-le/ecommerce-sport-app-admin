import { FC } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useExtendedSnackbar from "@/hooks/useExtendedSnackbar";
import { LoadingButton } from "@mui/lab";
import { EyeOff } from "@untitled-ui/icons-react";
import { ApiReviewStoreSlice } from "@/api/ApiReviewStoreSlice";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";

const validationSchema = Yup.object({});

interface ReviewDeactivateButtonProps {
  reviewId: string;
  disable?: boolean;
}
const ReviewDeactivateButton: FC<ReviewDeactivateButtonProps> = ({
  reviewId,
  disable,
}) => {
  const confirm = useConfirmDialog();
  const { showSuccessSnackbar, showErrorSnackbar } = useExtendedSnackbar();
  const [deactivateReview, deactivateReviewResult] =
    ApiReviewStoreSlice.useDeactivateReviewMutation();

  const formik = useFormik({
    initialValues: {},
    validationSchema,
    onSubmit: async () => {
      try {
        const payload = {
          id: reviewId || "",
        };

        const data = await deactivateReview(payload).unwrap();
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
        "You are trying to deactivate this review, this action is irreversable",
      onConfirm: () => {
        formik.handleSubmit();
      },
      dialogProps: {
        maxWidth: "xs",
      },
      confirmButtonProps: { color: "error", variant: "contained-error" },
    });
  };

  const isDisableBtn = !reviewId;

  return (
    <LoadingButton
      disabled={disable || isDisableBtn}
      className="capitalize font-semibold text-base font-inter md:px-10 w-full"
      variant="contained-error"
      loading={deactivateReviewResult.isLoading}
      startIcon={<EyeOff width={18} height={18} />}
      onClick={() => handleReject()}
    >
      Hide
    </LoadingButton>
  );
};

export default ReviewDeactivateButton;
