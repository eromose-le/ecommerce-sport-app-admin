import { CircularProgress } from "@mui/material";

/**
 *
 * @param {import("@mui/material").CircularProgressProps} props
 */
function LoadingIndicator(props: Record<string, any>) {
  return <CircularProgress size={20} {...props} />;
}

export default LoadingIndicator;
