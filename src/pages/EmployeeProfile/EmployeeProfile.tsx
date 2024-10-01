import BackButton from "@/common/BackButton";
import LoadingContent from "@/common/LoadingContent/LoadingContent";
import { FC } from "react";
import { useParams } from "react-router-dom";

import ErrorContent from "@/common/LoadingContent/ErrorContent";
import EmptyContentCard from "@/common/LoadingContent/EmptyContentCard";
import { objectToArray } from "@/utils/ObjectUtils";
import { Typography } from "@mui/material";
import EmployeeProfileDetailCardSkeleton from "./EmployeeProfileDetailCardSkeleton";
import EmployeeProfileDetailCard from "./EmployeeProfileDetailCard";
import { ApiEmployeeStoreSlice } from "@/api/ApiEmployeeStoreSlice";

interface EmployeeProfileProps {}
const EmployeeProfile: FC<EmployeeProfileProps> = () => {
  const { id } = useParams<{ id: string }>() as { id: string };

  const getUserQuery = ApiEmployeeStoreSlice.useGetEmployeeInfoQuery(
    {
      id,
    },
    { skip: !id }
  );

  return (
    <div className="container-wrapper py-[30px] h-[calc(100vh-118.5px)]">
      <div className="flex items-center justify-between">
        <div>
          <BackButton />
        </div>
      </div>

      <div className="grid grid-cols-12 mt-7">
        <div className="col-span-8 2xl:col-span-9">
          <Typography
            color="grey.900"
            className="font-bold text-2xl font-crimson"
          >
            Profile Summary
          </Typography>

          <div className="space-y-7">
            <LoadingContent
              loading={getUserQuery.isLoading}
              error={getUserQuery.isError}
              onReload={getUserQuery.refetch}
              loadingContent={<EmployeeProfileDetailCardSkeleton />}
              errorContent={
                <ErrorContent onReload={() => getUserQuery.refetch} />
              }
              emptyContent={<EmptyContentCard />}
              data={objectToArray(getUserQuery?.data?.data)}
            >
              <EmployeeProfileDetailCard
                {...{
                  firstName: getUserQuery?.data?.data?.firstName || "",
                  lastName: getUserQuery?.data?.data?.lastName || "",
                  email: getUserQuery?.data?.data?.email || "",
                  address: getUserQuery?.data?.data?.address || "Nill",
                  avatar: getUserQuery?.data?.data?.avatar || "",
                  createdAt: getUserQuery?.data?.data?.createdAt || "",
                  phone: getUserQuery?.data?.data?.phone || "",
                }}
              />
            </LoadingContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
