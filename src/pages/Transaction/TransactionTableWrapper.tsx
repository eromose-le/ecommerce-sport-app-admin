import { FC } from "react";
import TransactionTable from "./TransactionTable";

interface TransactionTableWrapperProps {}
const TransactionTableWrapper: FC<TransactionTableWrapperProps> = () => {
  return (
    <>
      <TransactionTable />
    </>
  );
};

export default TransactionTableWrapper;