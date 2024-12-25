import { Breadcrumb, BreadcrumbItem } from "@/common/Breadcrum";
import { routeEnum } from "@/constants/RouteConstants";
import { FC } from "react";
import { ORDER_TAB } from "./OrderConstants";
import { useNavigate, useSearchParams } from "react-router-dom";
import BackButton from "@/common/BackButton";
import { Badge, Button, Tab, Tabs, Typography } from "@mui/material";
import { UserPlus02 } from "@untitled-ui/icons-react";
import { urlSearchParamsExtractor } from "@/utils/routeUtils";
import OrderTableWrapper from "./OrderTableWrapper";
interface TabItem {
  id: number;
  key: string;
  label: string;
  content: React.ReactNode;
  notifications: number;
}

interface OrderProps {}
const Order: FC<OrderProps> = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const extractedParams = urlSearchParamsExtractor(searchParams, {
    tab: ORDER_TAB.NONE,
  });

  const breadcrumbItems: BreadcrumbItem[] = [
    { path: routeEnum.ORDERS, label: "Orders", disabled: true },
    { path: routeEnum.ORDERS, label: "Order list" },
  ];

  const tabs: TabItem[] = [
    {
      id: 1,
      key: ORDER_TAB.NONE,
      label: "All",
      notifications: 0,
      content: <OrderTableWrapper />,
    },
    {
      id: 2,
      key: ORDER_TAB.PENDING,
      label: "Pending",
      notifications: 0,
      content: <OrderTableWrapper />,
    },
    {
      id: 3,
      key: ORDER_TAB.SHIPPED,
      label: "Shipped",
      notifications: 0,
      content: <OrderTableWrapper />,
    },
    {
      id: 4,
      key: ORDER_TAB.OUT_FOR_DELIVERY,
      label: "Out for delivery",
      notifications: 0,
      content: <OrderTableWrapper />,
    },
    {
      id: 5,
      key: ORDER_TAB.DELIVERED,
      label: "Delivered",
      notifications: 0,
      content: <OrderTableWrapper />,
    },
    {
      id: 6,
      key: ORDER_TAB.CANCELED,
      label: "Canceled",
      notifications: 0,
      content: <OrderTableWrapper />,
    },
    {
      id: 7,
      key: ORDER_TAB.FAILED_DELIVERY,
      label: "Failed Delivery",
      notifications: 0,
      content: <OrderTableWrapper />,
    },
  ];

  const currentTabIndex = tabs.findIndex(
    (tab) => tab.key === extractedParams.tab
  );

  const handleChangeTabParams = (tabKey: string) => {
    setSearchParams({ tab: tabKey });
  };

  const handleGoToCreateOrder = () => {
    navigate(routeEnum.ORDERS_CREATE);
  };

  return (
    <div className="container-wrapper py-[30px] h-[calc(100vh-118.5px)]">
      <div className="flex items-end justify-between">
        <div className="space-y-5">
          <BackButton />
          <div>
            <Breadcrumb breadcrumbItems={breadcrumbItems} />
            <Typography
              color="grey.900"
              className="font-bold text-2xl font-crimson"
            >
              Orders
            </Typography>
          </div>
        </div>
        <Button
          disabled
          variant="contained"
          startIcon={<UserPlus02 width={20} height={20} />}
          className="capitalize font-bold font-inter"
          size="large"
          onClick={handleGoToCreateOrder}
        >
          Add New Order
        </Button>
      </div>

      <div className="mt-10">
        <Tabs
          value={currentTabIndex === -1 ? 0 : currentTabIndex}
          variant="scrollable"
          scrollButtons={false}
          aria-label="order tabs"
        >
          {tabs.map((tab) => (
            <Tab
              className="capitalize"
              key={tab.key}
              onClick={() => handleChangeTabParams(tab.key)}
              label={
                <Badge
                  badgeContent={
                    tab?.notifications > 0 ? tab?.notifications : null
                  }
                  color="error"
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "error.600",
                      color: "white",
                      fontSize: "12px",
                      fontFamily: "Inter",
                      fontWeight: 400,
                      position: "relative",
                      top: 8,
                      right: 6,
                      borderRadius: "50%",
                    },
                  }}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  {tab.label}
                </Badge>
              }
            />
          ))}
        </Tabs>

        <div>{tabs?.[currentTabIndex]?.content}</div>
      </div>
    </div>
  );
};

export default Order;
