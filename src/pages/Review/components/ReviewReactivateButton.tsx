import { FC } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useExtendedSnackbar from "@/hooks/useExtendedSnackbar";
import { LoadingButton } from "@mui/lab";
import { Eye } from "@untitled-ui/icons-react";
import { ApiReviewStoreSlice } from "@/api/ApiReviewStoreSlice";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";

const validationSchema = Yup.object({});

interface ReviewReactivateButtonProps {
  reviewId: string;
  disable?: boolean;
}
const ReviewReactivateButton: FC<ReviewReactivateButtonProps> = ({
  reviewId,
  disable,
}) => {
  const confirm = useConfirmDialog();
  const { showSuccessSnackbar, showErrorSnackbar } = useExtendedSnackbar();
  const [reactivateReview, reactivateReviewResult] =
    ApiReviewStoreSlice.useReactivateReviewMutation();

  const formik = useFormik({
    initialValues: {},
    validationSchema,
    onSubmit: async () => {
      try {
        const payload = {
          id: reviewId || "",
        };

        const data = await reactivateReview({
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
      description: "You are trying to reactivate this review",
      onConfirm: () => {
        formik.handleSubmit();
      },
      dialogProps: {
        maxWidth: "xs",
      },
      confirmButtonProps: { color: "success", variant: "contained" },
    });
  };

  const isDisableBtn = !reviewId;

  return (
    <LoadingButton
      disabled={!disable || isDisableBtn}
      className="capitalize font-semibold text-base font-inter md:px-10 w-full"
      variant="contained"
      loading={reactivateReviewResult.isLoading}
      startIcon={<Eye width={18} height={18} />}
      onClick={() => handleReject()}
    >
      Show
    </LoadingButton>
  );
};

export default ReviewReactivateButton;
