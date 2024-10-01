import { FC } from "react";

const EmployeeProfileDetailCardSkeleton: FC = () => {
  return (
    <section className="flex items-center gap-5 shadow-sm bg-white mt-10 rounded-2xl animate-pulse">
      <div className="h-full max-w-[280px]">
        {/* Profile Picture Skeleton */}
        <div className="h-[230px] w-full bg-gray-200 rounded-tl-2xl rounded-bl-2xl"></div>
      </div>

      <div className="flex flex-col items-start justify-center space-y-3 p-5 w-full">
        {/* Name Skeleton */}
        <div className="flex items-center gap-2 w-full">
          <div className="h-6 w-[150px] bg-gray-200 rounded"></div>
        </div>

        {/* Title Skeleton */}
        <div className="flex items-center gap-2 w-full">
          <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
          <div className="h-4 w-[100px] bg-gray-200 rounded"></div>
        </div>

        {/* Email Skeleton */}
        <div className="flex items-center gap-2 w-full">
          <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
          <div className="h-4 w-[200px] bg-gray-200 rounded"></div>
        </div>

        {/* Phone Number Skeleton */}
        <div className="flex items-center gap-2 w-full">
          <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
          <div className="h-4 w-[120px] bg-gray-200 rounded"></div>
        </div>

        {/* Address Skeleton */}
        <div className="flex items-center gap-2 w-full">
          <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
          <div className="h-4 w-[150px] bg-gray-200 rounded"></div>
        </div>

        {/* Registration Date Skeleton */}
        <div className="flex items-center gap-2 w-full">
          <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
          <div className="h-4 w-[120px] bg-gray-200 rounded"></div>
        </div>
      </div>
    </section>
  );
};

export default EmployeeProfileDetailCardSkeleton;
