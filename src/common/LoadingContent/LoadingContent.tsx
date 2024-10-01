import { ReactNode } from "react";

import clsx from "clsx";
import LoadingIndicator from "./LoadingIndicator";
import EmptyContentCard from "./EmptyContentCard";
import ErrorContent from "./ErrorContent";

interface LoadingContentType<T> {
  size?: number;
  error?: boolean;
  loading?: boolean;
  children?: JSX.Element | (() => JSX.Element) | null;
  onReload?: () => void;
  onMount?: () => void;
  data?: T[];
  loadingContent?: JSX.Element | ((x: JSX.Element) => ReactNode);
  errorContent?: JSX.Element | ((x: JSX.Element) => ReactNode);
  emptyContent?: JSX.Element | ((x: JSX.Element) => ReactNode);
  className?: string;
}

function LoadingContent<T>({
  size = 40,
  error = false,
  loading = false,
  data = [],
  children = null,
  onReload = () => {},
  onMount = () => {},
  loadingContent,
  errorContent,
  emptyContent,
  className,
  ...rest
}: Partial<LoadingContentType<T>>): JSX.Element {
  const defaultLoadingContent = (
    <div className="flex justify-center items-center w-full h-full">
      <LoadingIndicator size={size} />
    </div>
  );
  const defaultEmptyContent = <EmptyContentCard {...rest} />;
  const defaultErrorContent = (
    <ErrorContent onReload={() => onReload()} {...rest} />
  );

  if (error) {
    return (
      <div className={clsx(className)}>
        {errorContent
          ? typeof errorContent === "function"
            ? errorContent(defaultErrorContent)
            : errorContent
          : defaultErrorContent}
      </div>
    );
  }

  if (loading) {
    return (
      <div className={clsx(className)}>
        {loadingContent
          ? typeof loadingContent === "function"
            ? loadingContent(defaultLoadingContent)
            : loadingContent
          : defaultLoadingContent}
      </div>
    );
  }

  if (!loading && !error && data?.length === 0) {
    return (
      <div className={clsx(className)}>
        {emptyContent
          ? typeof emptyContent === "function"
            ? emptyContent(defaultEmptyContent)
            : emptyContent
          : defaultEmptyContent}
      </div>
    );
  }

  return <>{typeof children === "function" ? children() : children}</>;
}

export default LoadingContent;
