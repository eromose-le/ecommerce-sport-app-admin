import { Typography } from "@mui/material";
import { Loading02, RefreshCcw04, SearchSm } from "@untitled-ui/icons-react";
import { FC } from "react";

interface TextFieldLoadingProps {}
export const TextFieldLoading: FC<TextFieldLoadingProps> = () => {
  return (
    <Typography
      color="grey.500"
      component="span"
      className="text-sm p-3 flex animate-pulse items-center gap-2"
    >
      loading
      <Loading02 className="animate-spin-slow" width={16} height={16} />
    </Typography>
  );
};

interface TextFieldEmptyProps {}
export const TextFieldEmpty: FC<TextFieldEmptyProps> = () => {
  return (
    <Typography
      color="grey.500"
      component="span"
      className="text-sm p-3 flex animate-pulse items-center gap-2"
    >
      No record found.
      <SearchSm className="animate-ping" width={16} height={16} />
    </Typography>
  );
};

interface TextFieldErrorProps {
  refetch: () => void;
}
export const TextFieldError: FC<TextFieldErrorProps> = ({ refetch }) => {
  return (
    <Typography
      color="grey.500"
      component="span"
      className="text-sm p-3 flex animate-pulse items-center gap-2"
    >
      An error occured.
      <RefreshCcw04
        className="text-green-600 cursor-pointer"
        width={16}
        height={16}
        onClick={refetch}
      />
    </Typography>
  );
};
