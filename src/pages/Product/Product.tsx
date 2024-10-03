import { Breadcrumb, BreadcrumbItem } from "@/common/Breadcrum";
import { routeEnum } from "@/constants/RouteConstants";
import { FC } from "react";
import { PRODUCT_TAB } from "./ProductConstants";
import { useNavigate, useSearchParams } from "react-router-dom";
import BackButton from "@/common/BackButton";
import { Badge, Button, Tab, Tabs, Typography } from "@mui/material";
import { UserPlus02 } from "@untitled-ui/icons-react";
import { urlSearchParamsExtractor } from "@/utils/routeUtils";
import ProductTableWrapper from "./ProductTableWrapper";
interface TabItem {
  id: number;
  key: string;
  label: string;
  content: React.ReactNode;
  notifications: number;
}

interface ProductProps {}
const Product: FC<ProductProps> = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const extractedParams = urlSearchParamsExtractor(searchParams, {
    tab: PRODUCT_TAB.NONE,
  });

  const breadcrumbItems: BreadcrumbItem[] = [
    { path: routeEnum.PRODUCTS, label: "Products", disabled: true },
    { path: routeEnum.PRODUCTS, label: "Product list" },
  ];

  const tabs: TabItem[] = [
    {
      id: 1,
      key: PRODUCT_TAB.NONE,
      label: "All",
      notifications: 0,
      content: <ProductTableWrapper />,
    },
  ];

  const currentTabIndex = tabs.findIndex(
    (tab) => tab.key === extractedParams.tab
  );

  const handleChangeTabParams = (tabKey: string) => {
    setSearchParams({ tab: tabKey });
  };

  const handleGoToCreateProduct = () => {
    navigate(routeEnum.PRODUCTS_CREATE);
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
              Products
            </Typography>
          </div>
        </div>
        <Button
          // disabled
          variant="contained"
          startIcon={<UserPlus02 width={20} height={20} />}
          className="capitalize font-bold font-inter"
          size="large"
          onClick={handleGoToCreateProduct}
        >
          Add New Product
        </Button>
      </div>

      <div className="mt-10">
        <Tabs
          value={currentTabIndex === -1 ? 0 : currentTabIndex}
          variant="scrollable"
          scrollButtons={false}
          aria-label="product tabs"
        >
          {tabs.map((tab) => (
            <Tab
              className="capitalize"
              key={tab.key}
              onClick={() => handleChangeTabParams(tab.key)}
              label={
                <Badge
                  badgeContent={4}
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

export default Product;
