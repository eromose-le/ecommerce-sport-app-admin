import {
  Card,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { RefreshCcw01 } from "@untitled-ui/icons-react";

interface ErrorContentType {
  title?: string;
  data?: unknown[];
  headerTitle?: string;
  className?: string;
  description?: string;
  header?: React.ReactNode;
  variant?: "error" | "primary";
  children?: React.ReactNode;
  onReload?: () => void;
}

function ErrorContent({
  variant = "error",
  title = "Something went wrong",
  description = "We're quite sorry about this!",
  header,
  headerTitle,
  children,
  onReload,
  className,
  ...rest
}: ErrorContentType): JSX.Element {
  return (
    <Card variant="outlined" {...rest}>
      <CardContent>
        {headerTitle ? (
          <>
            <Typography
              variant="body1"
              className="capitalize"
              fontWeight="bold"
            >
              {headerTitle}
            </Typography>
            <Divider />
          </>
        ) : null}

        <div className="flex justify-center items-center flex-col min-h-[300px] w-full">
          {header}

          <svg
            width={28}
            height={28}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
              stroke="#D92D20"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <Typography
            variant="body1"
            className="mt-4 text-center font-gelica"
            fontWeight={600}
          >
            {title}
          </Typography>
          <Typography
            className="mt-2 text-center"
            variant="body2"
            style={{ color: "#6C6C6C" }}
          >
            {description}
          </Typography>
          {onReload && (
            <div>
              <Tooltip title="Refresh">
                <IconButton size="large" onClick={onReload}>
                  <RefreshCcw01 />
                </IconButton>
              </Tooltip>
            </div>
          )}
          <div className="w-full max-w-xs mt-4 inline-flex justify-center">
            {children}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ErrorContent;
