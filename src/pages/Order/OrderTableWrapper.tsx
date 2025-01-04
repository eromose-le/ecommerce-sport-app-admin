import { FC } from "react";
import OrderTable from "./OrderTable";

interface OrderVerifiedProps {}
const OrderVerified: FC<OrderVerifiedProps> = () => {
  return (
    <>
      <OrderTable />
    </>
  );
};

export default OrderVerified;