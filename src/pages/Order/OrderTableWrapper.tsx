import { FC } from "react";
import ProductTable from "./OrderTable";

interface ProductVerifiedProps {}
const ProductVerified: FC<ProductVerifiedProps> = () => {
  return (
    <>
      <ProductTable />
    </>
  );
};

export default ProductVerified;