import { FC } from "react";
import ProductTable from "./ProductTable";

interface ProductVerifiedProps {}
const ProductVerified: FC<ProductVerifiedProps> = () => {
  return (
    <>
      <ProductTable />
    </>
  );
};

export default ProductVerified;