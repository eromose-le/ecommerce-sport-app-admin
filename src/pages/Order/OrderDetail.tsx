import { ApiOrderStoreSlice } from "@/api/ApiOrderStoreSlice";
import BackButton from "@/common/BackButton";
import { formatCurrency } from "@/utils/currencyUtils";
import { Chip, Typography } from "@mui/material";
import { FC } from "react";
import { useParams } from "react-router-dom";

import SportygalaxyLoadingIndicator from "@/common/Loading/SportygalaxyLoadingIndicator";
import OrderProductList from "./OrderProductList";
import OrderStatus from "@/common/OrderStatus";
import OrderStatusAssignModal from "./OrderStatusAssignModal";
import WatermarkOverlay from "@/common/WatermarkOverlay";
import { ORDER_STATUS } from "@/constants/enums";
import OrderDeleteButton from "./OrderDeleteButton";

interface OrderDetailProps {}
const OrderDetail: FC<OrderDetailProps> = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  const getOrderInfoQuery = ApiOrderStoreSlice.useGetOrderInfoQuery(
    {
      id,
    },
    { skip: !id }
  );
  const orderInfoResponse = getOrderInfoQuery?.data?.data;

  const user = orderInfoResponse?.user || orderInfoResponse?.offlineUser || {};
  const isOfflineUser = !orderInfoResponse?.user;
  const isHasExtraInfo =
    orderInfoResponse?.user && orderInfoResponse?.offlineUser;
  const userName = `${user?.firstName || "N/A"} ${user?.lastName || "N/A"}`;
  const userEmail = user?.email || "N/A";
  const userAddress = user?.address || "N/A";
  const userPhone = user?.phone || "N/A";

  const offlineUserAddress = orderInfoResponse?.offlineUser?.address || "N/A";
  const offlineUserPhone = orderInfoResponse?.offlineUser?.phone || "N/A";

  const total = orderInfoResponse?.total || 0;
  const status = orderInfoResponse?.status || "";

  const isDeleted = orderInfoResponse?.isDeleted ?? false;
  const isCanceled =
    orderInfoResponse?.status === ORDER_STATUS.CANCELED || false;
  const isDisabled = isDeleted || isCanceled;

  // Generate dynamic text based on the flags
  const dynamicText = [
    isDeleted ? "ORDER DELETED" : null,
    isCanceled ? "ORDER CANCELED" : null,
  ]
    .filter(Boolean) // Remove null values
    .join(" and "); // Combine the text dynamically

  const userStatus = (): JSX.Element => {
    return (
      <>
        {isOfflineUser ? (
          <Chip
            color="error"
            className="text-xs font-inter font-medium"
            icon={<span className="w-2 h-2 rounded-full bg-[#F04438]"></span>}
            label="Offline Customer"
          />
        ) : (
          <Chip
            color="success"
            icon={<span className="w-2 h-2 rounded-full bg-[#1BA879]"></span>}
            label="Online Customer"
          />
        )}
      </>
    );
  };

  return (
    <>
      <WatermarkOverlay isVisible={isDisabled} text={dynamicText} />

      <div className="container-wrapper py-[30px]">
        <div className="flex items-center justify-between">
          <div>
            <BackButton />
          </div>
        </div>

        <div className="flex items-center justify-between mt-7">
          <Typography
            color="grey.900"
            className="font-bold text-4xl font-crimson"
          >
            Order Details
          </Typography>
        </div>

        {getOrderInfoQuery.isLoading ? (
          <SportygalaxyLoadingIndicator />
        ) : (
          <div className="mt-10 space-y-10">
            <OrderProductList items={orderInfoResponse?.items} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="mt-8">
                <p className="font-jost text-black text-mobile-2xl md:text-2xl font-bold">
                  Status
                </p>

                <div className="mt-2 space-y-6">
                  {status && (
                    <div className="space-y-3">
                      <p className="flex items-center gap-2 font-jost text-black text-mobile-xl md:text-xl font-light leading-normal tracking-wide">
                        Status: <OrderStatus status={status} />
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <p className="font-jost text-black text-mobile-2xl md:text-2xl font-bold">
                  Cost
                </p>

                <div className="mt-2 space-y-6">
                  {total && (
                    <div className="space-y-3">
                      <p className="flex items-center gap-2 font-jost text-black text-mobile-xl md:text-xl font-light leading-normal tracking-wide">
                        Total: {formatCurrency(total || 0)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <p className="font-jost text-black text-mobile-2xl md:text-2xl font-bold">
                  Delivery Information {userStatus()}
                </p>

                <div className="mt-2 space-y-6">
                  {user && (
                    <div className="space-y-3">
                      <p className="flex items-center gap-2 font-jost text-black text-mobile-xl md:text-xl font-light leading-normal tracking-wide">
                        Name: {userName}
                      </p>
                      <p className="flex items-center gap-2 font-jost text-black text-mobile-xl md:text-xl font-light leading-normal tracking-wide">
                        Email: {userEmail}
                      </p>
                      <p className="flex items-center gap-2 font-jost text-black text-mobile-xl md:text-xl font-light leading-normal tracking-wide">
                        Address: {userAddress}
                      </p>
                      <p className="flex items-center gap-2 font-jost text-black text-mobile-xl md:text-xl font-light leading-normal tracking-wide">
                        Phone Number: {userPhone}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <p className="font-jost text-black text-mobile-2xl md:text-2xl font-bold">
                  Additional Information
                </p>

                <div className="mt-2 space-y-6">
                  {isHasExtraInfo && (
                    <div className="space-y-3">
                      <p className="flex items-center gap-2 font-jost text-black text-mobile-xl md:text-xl font-light leading-normal tracking-wide">
                        Address: {offlineUserAddress}
                      </p>
                      <p className="flex items-center gap-2 font-jost text-black text-mobile-xl md:text-xl font-light leading-normal tracking-wide">
                        Phone Number: {offlineUserPhone}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-4 space-x-3">
              <OrderStatusAssignModal
                id={id}
                status={status}
                buttonText="Update Order Status"
              />

              <OrderDeleteButton disable={isDisabled} orderId={id} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderDetail;
