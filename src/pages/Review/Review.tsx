import { Breadcrumb, BreadcrumbItem } from "@/common/Breadcrum";
import { routeEnum } from "@/constants/RouteConstants";
import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import BackButton from "@/common/BackButton";
import { Badge, Tab, Tabs, Typography } from "@mui/material";
import { urlSearchParamsExtractor } from "@/utils/routeUtils";

import { REVIEW_TAB } from "./ReviewConstants";
import ReviewTableWrapper from "./ReviewTableWrapper";
interface TabItem {
  id: number;
  key: string;
  label: string;
  content: React.ReactNode;
  notifications: number;
}

interface ReviewProps {
  //
}
const Review: FC<ReviewProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const extractedParams = urlSearchParamsExtractor(searchParams, {
    tab: REVIEW_TAB.NONE,
  });

  const breadcrumbItems: BreadcrumbItem[] = [
    { path: routeEnum.REVIEWS, label: "Reviews", disabled: true },
    { path: routeEnum.REVIEWS, label: "Review list" },
  ];

  const tabs: TabItem[] = [
    {
      id: 1,
      key: REVIEW_TAB.NONE,
      label: "All",
      notifications: 0,
      content: <ReviewTableWrapper />,
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
              Reviews
            </Typography>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Tabs
          value={currentTabIndex === -1 ? 0 : currentTabIndex}
          variant="scrollable"
          scrollButtons={false}
          aria-label="review tabs"
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

export default Review;
