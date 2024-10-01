import { IconButton, Tooltip } from "@mui/material";

interface ErrorDialogProps {
  title?: string;
  description?: string | JSX.Element;
  onRetry?: () => void;
  retryText?: string;
}

export function ErrorDialog({
  title = "Something went wrong",
  description = "Sorry, something unexpected happened, Please try again..",
  onRetry,
  retryText,
  ...rest
}: ErrorDialogProps) {
  function handleRetry(e: any) {
    e.stopPropagation();
    if (onRetry) {
      onRetry();
    }
  }

  return (
    <div className="flex flex-col items-center justify-center px-4 mt-6">
      <div {...rest} className="border rounded-md border-gray-200 p-7">
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-xs">{description}</p>

        <section className="flex items-center justify-center gap-2 mt-2">
          <Tooltip title="Refresh">
            <IconButton
              onClick={handleRetry}
              className="border-1 border-gray-200"
            >
              {retryText ? (
                retryText
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10C2 10 4.00498 7.26822 5.63384 5.63824C7.26269 4.00827 9.5136 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.89691 21 4.43511 18.2543 3.35177 14.5M2 10V4M2 10H8"
                    stroke="#aaa"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title="Reset">
            <IconButton
              onClick={handleRetry}
              className="border-1 border-gray-200"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0001 2V12M18.3601 6.64C19.6185 7.89879 20.4754 9.50244 20.8224 11.2482C21.1694 12.9939 20.991 14.8034 20.3098 16.4478C19.6285 18.0921 18.4749 19.4976 16.9949 20.4864C15.515 21.4752 13.775 22.0029 11.9951 22.0029C10.2152 22.0029 8.47527 21.4752 6.99529 20.4864C5.51532 19.4976 4.36176 18.0921 3.68049 16.4478C2.99921 14.8034 2.82081 12.9939 3.16784 11.2482C3.51487 9.50244 4.37174 7.89879 5.63012 6.64"
                  stroke="red"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </IconButton>
          </Tooltip>
        </section>
      </div>
    </div>
  );
}

export default ErrorDialog;
