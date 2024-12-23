import { ApiProductStoreSlice } from "@/api/ApiProductStoreSlice";
import BackButton from "@/common/BackButton";
import { formatCurrency } from "@/utils/currencyUtils";
import { Typography, Button } from "@mui/material";
import { Edit01 } from "@untitled-ui/icons-react";
import { FC } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import ProductImageViewer from "./components/ProductImageViewer";
import SportygalaxyLoadingIndicator from "@/common/Loading/SportygalaxyLoadingIndicator";
import ProductDynamicKeyValuePairTable from "./components/ProductDynamicKeyValuePairTable";
import { routeEnum } from "@/constants/RouteConstants";
import ProductDeleteButton from "./components/ProductDeleteButton";
import WatermarkOverlay from "@/common/WatermarkOverlay";

interface ProductDetailProps {}
const ProductDetail: FC<ProductDetailProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>() as { id: string };
  const getProductInfoQuery = ApiProductStoreSlice.useGetProductInfoQuery(
    {
      id,
    },
    { skip: !id }
  );
  const productInfoResponse = getProductInfoQuery?.data?.data;

  console.log("productInfoResponse ::", productInfoResponse);

  // const id = productInfoResponse?.id || "";
  const name = productInfoResponse?.name || "";
  const description = productInfoResponse?.description || "";
  const price = productInfoResponse?.price || "";
  const stock = productInfoResponse?.stock || 0;
  const category = productInfoResponse?.category?.name || "";
  const subcategory = productInfoResponse?.subcategory?.name || "";
  const isDeleted = productInfoResponse?.isDeleted;

  const colors = productInfoResponse?.colors || [];
  const sizes = productInfoResponse?.sizes || [];

  const medias = productInfoResponse?.medias || [];

  const specification = productInfoResponse?.specification || [
    { key: "", value: "" },
  ];
  const keyattribute = productInfoResponse?.keyattribute || [
    { key: "", value: "" },
  ];

  const handleGotoUpdateProduct = () => {
    const route = generatePath(routeEnum.PRODUCTS_UPDATE, {
      id,
    });
    navigate(route);
  };

  const isDisabled = !(
    !id ||
    isDeleted ||
    getProductInfoQuery.isFetching ||
    getProductInfoQuery.isLoading
  );

  return (
    <>
      <WatermarkOverlay isVisible={isDeleted} text="Product Deleted" />

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
            Product Details
          </Typography>
        </div>

        {getProductInfoQuery.isLoading ? (
          <SportygalaxyLoadingIndicator />
        ) : (
          <div className="mt-10 space-y-10">
            <ProductImageViewer
              medias={medias}
              isLoading={getProductInfoQuery.isLoading}
              isError={getProductInfoQuery.isError}
              errorMessage={getProductInfoQuery.error?.message}
            />

            <div className="space-y-4">
              <p className="capitalize font-jost text-black text-mobile-2xl md:text-2xl font-bold">
                {name || ""}
              </p>
              <p className="font-jost text-secondary text-mobile-xl md:text-xl font-light leading-normal tracking-wide">
                {description || ""}
              </p>

              <div className="mt-8">
                <p className="font-jost text-black text-mobile-2xl md:text-2xl font-bold">
                  Groups
                </p>

                <div className="mt-2 space-y-6">
                  {category && (
                    <div className="space-y-3">
                      <p className="font-jost text-black text-mobile-xl md:text-xl font-light leading-normal tracking-wide">
                        Category: {category}
                      </p>
                    </div>
                  )}
                </div>
                <div className="mt-2 space-y-6">
                  {subcategory && (
                    <div className="space-y-3">
                      <p className="font-jost text-black text-mobile-xl md:text-xl font-light leading-normal tracking-wide">
                        Subcategory: {subcategory}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <p className="font-jost text-black text-mobile-2xl md:text-2xl font-bold">
                  Variations
                </p>

                <div className="mt-2 space-y-6">
                  {colors && (
                    <div className="space-y-3">
                      <p className="font-jost text-black text-mobile-xl md:text-xl font-light leading-normal tracking-wide">
                        Total options: {colors?.length} colour
                        {colors?.length >= 2 ? "s" : ""}
                      </p>
                      <div className="flex items-center flex-wrap gap-3">
                        {colors.map((color: any, index: number) => (
                          <span
                            key={index}
                            className="h-fit w-fit rounded-full"
                          >
                            <Button
                              type="button"
                              style={{ backgroundColor: color?.color?.name }}
                              className={`w-10 h-10 rounded-full ${
                                !!color?.color?.name
                                  ? "border-1 border-green-400"
                                  : ""
                              }`}
                            />
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {sizes && (
                    <div className="space-y-3">
                      <p className="font-jost text-black text-mobile-xl md:text-xl font-light leading-normal tracking-wide">
                        Total options: {sizes?.length} size
                        {sizes?.length >= 2 ? "s" : ""}
                      </p>
                      <div className="flex items-center flex-wrap gap-3">
                        {sizes.map((size: any, index: number) => (
                          <Button
                            key={index}
                            type="button"
                            className={`rounded-none ${
                              !!size?.size?.name
                                ? "border-1 border-green-400"
                                : ""
                            }`}
                          >
                            {size?.size?.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <p className="font-medium text-mobile-5xl md:text-4xl">
                  {formatCurrency(price || 0)}
                  <span className="text-destructive text-sm pl-2">
                    *{stock} unit{stock > 1 ? "s" : ""} left
                  </span>
                </p>
              </div>
            </div>

            <ProductDynamicKeyValuePairTable
              title="Specifications"
              data={specification}
            />

            <ProductDynamicKeyValuePairTable
              title="Keyattributes"
              data={keyattribute}
            />

            <div className="mt-10 space-x-3">
              <Button
                disabled={!isDisabled}
                onClick={handleGotoUpdateProduct}
                startIcon={<Edit01 width={20} height={20} />}
                className="capitalize font-semibold text-base font-inter md:px-10"
                variant="ghost"
                size="medium"
              >
                Edit
              </Button>

              <ProductDeleteButton disable={!isDisabled} productId={id} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
