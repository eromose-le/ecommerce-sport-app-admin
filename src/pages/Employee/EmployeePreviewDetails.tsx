import { Typography, Divider, Button, Avatar, Chip } from "@mui/material";
import { CheckVerified01, InfoOctagon } from "@untitled-ui/icons-react";
import { FC } from "react";
import { useSelector } from "react-redux";
import { generatePath, useNavigate } from "react-router-dom";
import { routeEnum } from "@/constants/RouteConstants";
import { EMPLOYEE_APPROVAL_STATUS } from "@/constants/enums";

interface EmployeePreviewDetailsProps {}
const EmployeePreviewDetails: FC<EmployeePreviewDetailsProps> = () => {
  const navigate = useNavigate();
  const userDetailSnapshot = useSelector(
    (state: any) => state.global.userDetailSnapshot
  );

  const handleGotoApplication = () => {
    const route = generatePath(routeEnum.USERS_EMPLOYEE_APPLICATION_DETAILS, {
      id: userDetailSnapshot.id,
    });
    navigate(route);
  };

  const renderApproval = () => {
    if (userDetailSnapshot?.employeeDoc) {
      if (
        userDetailSnapshot?.employeeDoc?.status === EMPLOYEE_APPROVAL_STATUS.PENDING
      ) {
        return (
          <ApprovalStatus
            colorCode="#f79007"
            status={userDetailSnapshot?.employeeDoc?.status}
          />
        );
      }
      if (
        userDetailSnapshot?.employeeDoc?.status === EMPLOYEE_APPROVAL_STATUS.APPROVED
      ) {
        return (
          <ApprovalStatus
            colorCode="#027A48"
            status={userDetailSnapshot?.employeeDoc?.status}
          />
        );
      }
      if (
        userDetailSnapshot?.employeeDoc?.status === EMPLOYEE_APPROVAL_STATUS.REJECTED
      ) {
        return (
          <ApprovalStatus
            colorCode="#F04438"
            status={userDetailSnapshot?.employeeDoc?.status}
          />
        );
      }
    } else {
      return (
        <ApprovalStatus
          colorCode="#eee"
          status={userDetailSnapshot?.employeeDoc?.status}
        />
      );
    }
  };

  return (
    <>
      <Typography color="grey.900" className="font-bold text-2xl font-crimson">
        Employee Detail View
      </Typography>
      {userDetailSnapshot ? (
        <div className="bg-white shadow-sm p-[30px] rounded-md space-y-4 mt-4">
          {renderApproval()}

          <div className="flex items-center gap-3 space-y-1">
            <Avatar
              className="w-10 h-10 rounded-full"
              src={userDetailSnapshot?.profilePhoto}
              alt="user-mage"
            />
            <div>
              <Typography
                color="grey.900"
                className="font-medium text-sm font-inter"
              >
                {userDetailSnapshot?.firstName} {userDetailSnapshot?.lastName}
              </Typography>
              <Typography
                color="grey.400"
                className="font-normal text-sm font-inter"
              >
                {userDetailSnapshot?.role?.title}
              </Typography>
            </div>
          </div>

          <div className="">
            <Divider />
            <div className="flex flex-col items-start py-[30px] gap-4 w-full">
              {/* TODO: apply date */}
              <div className="flex items-center justify-between w-full">
                <Typography
                  color="grey.900"
                  className="font-medium text-sm font-inter"
                >
                  Applied
                </Typography>
                <Typography
                  color="grey.600"
                  className="font-normal text-sm font-inter"
                >
                  Mar 3, 10:00PM
                </Typography>
              </div>
              <div className="flex items-center justify-between w-full">
                <Typography
                  color="grey.900"
                  className="font-medium text-sm font-inter"
                >
                  Status
                </Typography>
                <Typography
                  color="grey.600"
                  className="font-normal text-sm font-inter"
                >
                  {userDetailSnapshot?.accountEnabled ? "Active" : "Inactive"}
                </Typography>
              </div>

              {/* TODO property list count */}
              {/* <div className="flex items-center justify-between w-full">
              <Typography
                color="grey.900"
                className="font-medium text-sm font-inter"
              >
                Properties listed
              </Typography>
              <Typography
                color="grey.600"
                className="font-normal text-sm font-inter"
              >
                15
              </Typography>
            </div> */}
            </div>
            <Divider />
          </div>

          <Button
            variant="contained"
            className="capitalize font-bold font-inter"
            size="medium"
            fullWidth
            onClick={handleGotoApplication}
          >
            View Employee Application
          </Button>
        </div>
      ) : (
        <div className="p-3 flex items-center justify-center border-1">
          <Chip
            color="default"
            icon={<InfoOctagon color="#eee" />}
            label="No record selected"
          />
        </div>
      )}
    </>
  );
};

export default EmployeePreviewDetails;

const ApprovalStatus: FC<{
  colorCode: string;
  status: string;
}> = ({ colorCode, status }) => {
  return (
    <div className="flex items-center space-x-1">
      <CheckVerified01 color={colorCode} width={16} height={16} />
      <Typography color="grey.900" className="font-medium text-xs font-inter">
        {status}
      </Typography>
    </div>
  );
};
