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

export default function EmptyContentCard({
  title = "Empty Content",
  headerTitle,
  description = "No data available",
  header,
  cardVariant = "outlined",
  variant = "error",
  children,
  onRefresh,
  ...rest
}: {
  title?: string;
  headerTitle?: string;
  description?: string;
  header?: React.ReactNode;
  variant?: "error" | "primary";
  children?: React.ReactNode;
  onRefresh?: () => void;
  cardVariant?: any;
  [key: string]: string | React.ReactNode | (() => any);
}) {
  return (
    <Card variant={cardVariant} {...rest}>
      <CardContent className="h-full">
        {headerTitle ? (
          <>
            <Typography
              variant="body1"
              className="capitalize mb-4"
              fontWeight="bold"
            >
              {headerTitle}
            </Typography>
            <Divider />
          </>
        ) : null}
        <div className="flex justify-center items-center flex-col min-h-[300px] h-full w-full">
          {header}
          <svg
            width={28}
            height={28}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 8V12M12 16H12.01M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"
              stroke="#D97706"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Typography
            variant="body1"
            className="mt-4 items-center text-center"
            fontWeight={600}
          >
            {title}
          </Typography>
          <Typography
            className="mt-2 text-center"
            variant="body1"
            style={{ color: "#6C6C6C" }}
          >
            {description}
          </Typography>

          {onRefresh && (
            <div>
              <Tooltip title="Refresh">
                <IconButton size="large" onClick={onRefresh} title="Refresh">
                  <RefreshCcw01 />
                </IconButton>
              </Tooltip>
            </div>
          )}

          <div className="w-full max-w-xs mt-6 item inline-flex justify-center">
            {children}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
