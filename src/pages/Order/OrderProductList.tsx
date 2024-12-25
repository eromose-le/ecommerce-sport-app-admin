import { routeEnum } from "@/constants/RouteConstants";
import { formatCurrency } from "@/utils/currencyUtils";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { generatePath, useNavigate } from "react-router-dom";

const OrderProductList = ({ items }: { items: any }) => {
  const navigate = useNavigate();
  return (
    <>
      <p className="font-jost text-black text-mobile-2xl md:text-2xl font-bold">
        Products
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 mt-2">
        {items.map((item: any) => {
          const { product, quantity, price, color, size } = item;
          const displayImage = product?.displayImage || "";
          const name = product?.name || "Unnamed Product";
          const productId = product?.id || "";

          const gotoDetailedProduct = () => {
            const route = generatePath(routeEnum.PRODUCT_DETAILS, {
              id: productId,
            });
            return navigate(route);
          };

          return (
            <div className="flex flex-col gap-2" key={item.id}>
              <Card
                onClick={gotoDetailedProduct}
                className="shadow-none rounded-lg hover:border-1 hover:cursor-pointer"
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={displayImage}
                  alt={name}
                  className="object-cover p-4"
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    className="font-crimson text-black text-mobile-xl md:text-xl font-bold leading-normal tracking-wide"
                  >
                    {name}
                  </Typography>
                  <Typography className="font-jost text-black text-mobile-xl md:text-lg font-light leading-normal tracking-wide">
                    Price: {formatCurrency(price || 0)}
                  </Typography>
                  <Typography className="font-jost text-black text-mobile-xl md:text-lg font-light leading-normal tracking-wide">
                    Quantity: {quantity}
                  </Typography>
                  <Typography className="font-jost text-black text-mobile-xl md:text-lg font-light leading-normal tracking-wide">
                    Color: {color || "N/A"}
                  </Typography>
                  <Typography className="font-jost text-black text-mobile-xl md:text-lg font-light leading-normal tracking-wide">
                    Size: {size || "N/A"}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default OrderProductList;
