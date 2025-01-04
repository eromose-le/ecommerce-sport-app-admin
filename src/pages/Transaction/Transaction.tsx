import { Breadcrumb, BreadcrumbItem } from "@/common/Breadcrum";
import { routeEnum } from "@/constants/RouteConstants";
import { FC } from "react";
import { TRANSACTION_TAB } from "./TransactionConstants";
import { useSearchParams } from "react-router-dom";
import BackButton from "@/common/BackButton";
import { Badge, Button, Tab, Tabs, Typography } from "@mui/material";
import { UserPlus02 } from "@untitled-ui/icons-react";
import { urlSearchParamsExtractor } from "@/utils/routeUtils";
import TransactionTableWrapper from "./TransactionTableWrapper";

interface TabItem {
  id: number;
  key: string;
  label: string;
  content: React.ReactNode;
  notifications: number;
}

interface TransactionProps {}
const Transaction: FC<TransactionProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const extractedParams = urlSearchParamsExtractor(searchParams, {
    tab: TRANSACTION_TAB.NONE,
  });

  const breadcrumbItems: BreadcrumbItem[] = [
    { path: routeEnum.TRANSACTIONS, label: "Transactions", disabled: true },
    { path: routeEnum.TRANSACTIONS, label: "Transaction list" },
  ];

  const tabs: TabItem[] = [
    {
      id: 1,
      key: TRANSACTION_TAB.NONE,
      label: "All",
      notifications: 0,
      content: <TransactionTableWrapper />,
    },
    {
      id: 2,
      key: TRANSACTION_TAB.PENDING,
      label: "Pending",
      notifications: 0,
      content: <TransactionTableWrapper />,
    },
    {
      id: 3,
      key: TRANSACTION_TAB.SUCCESS,
      label: "Success",
      notifications: 0,
      content: <TransactionTableWrapper />,
    },
    {
      id: 4,
      key: TRANSACTION_TAB.FAILED,
      label: "Failed",
      notifications: 0,
      content: <TransactionTableWrapper />,
    },
  ];

  const currentTabIndex = tabs.findIndex(
    (tab) => tab.key === extractedParams.tab
  );

  const handleChangeTabParams = (tabKey: string) => {
    setSearchParams({ tab: tabKey });
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
              Transactions
            </Typography>
          </div>
        </div>
        <Button
          disabled
          variant="contained"
          startIcon={<UserPlus02 width={20} height={20} />}
          className="capitalize font-bold font-inter"
          size="large"
        >
          Add New Transaction
        </Button>
      </div>

      <div className="mt-10">
        <Tabs
          value={currentTabIndex === -1 ? 0 : currentTabIndex}
          variant="scrollable"
          scrollButtons={false}
          aria-label="transaction tabs"
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
                      btransactionRadius: "50%",
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

export default Transaction;
