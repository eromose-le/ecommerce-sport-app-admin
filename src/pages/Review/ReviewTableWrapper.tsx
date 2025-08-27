import { FC } from "react";
import ReviewTable from "./ReviewTable";

interface ReviewTableWrapperProps {}
const ReviewTableWrapper: FC<ReviewTableWrapperProps> = () => {
  return (
    <>
      <ReviewTable />
    </>
  );
};

export default ReviewTableWrapper;
