import { FC } from "react";
import EmployeeTable from "./EmployeeTable";

interface EmployeeVerifiedProps {}
const EmployeeVerified: FC<EmployeeVerifiedProps> = () => {
  return (
    <>
      <EmployeeTable />
    </>
  );
};

export default EmployeeVerified;
