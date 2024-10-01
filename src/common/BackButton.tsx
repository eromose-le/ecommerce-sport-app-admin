import {
  IconButton,
  type IconButtonProps,
  Tooltip,
  Typography,
} from "@mui/material";
import { ChevronLeft } from "@untitled-ui/icons-react";
import { useNavigate } from "react-router-dom";

function BackButton(props: IconButtonProps) {
  const navigate = useNavigate();
  return (
    <Tooltip title="Go Back">
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="flex items-center w-fit justify-center gap-1 -mt-2"
      >
        <IconButton className="m-0 p-0 -ml-2" {...props}>
          <ChevronLeft color="#027A48" />
        </IconButton>
        <Typography
          color="primary.700"
          className="font-medium text-base font-inter"
        >
          Back
        </Typography>
      </div>
    </Tooltip>
  );
}

export default BackButton;
