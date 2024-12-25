import { FC } from "react";
import { Avatar, Typography, Chip, AvatarGroup } from "@mui/material";
import { Calendar } from "@untitled-ui/icons-react";
import { TABLE_ROW_TYPE } from "@/constants/enums";
import { formatCurrency } from "@/utils/currencyUtils";
import { transformDate } from "@/utils/dateUtils";
import OrderStatus from "../OrderStatus";

interface TableTextProps {
  type: string;
  value?: any;
}
const TableText: FC<TableTextProps> = ({ type, value }) => {
  if (type === TABLE_ROW_TYPE.STATUS) {
    return (
      <>
        {value?.isVerified ? (
          <Chip
            color="success"
            className="text-xs font-inter font-medium"
            icon={<span className="w-2 h-2 rounded-full bg-[#1BA879]"></span>}
            label="Active"
          />
        ) : (
          <Chip
            color="error"
            icon={<span className="w-2 h-2 rounded-full bg-[#F04438]"></span>}
            label="Inactive"
          />
        )}
      </>
    );
  }

  if (type === TABLE_ROW_TYPE.PRODUCT_DESCRIPTION) {
    return (
      <Typography
        color="grey.900"
        className="font-inter font-normal truncate line-clamp-3 text-wrap text-xs"
      >
        {value?.description}
      </Typography>
    );
  }

  if (type === TABLE_ROW_TYPE.PRICE) {
    return (
      <Typography color="grey.900" className="font-inter font-medium text-sm">
        {formatCurrency(value?.price || 0)}
      </Typography>
    );
  }

  if (type === TABLE_ROW_TYPE.STOCK) {
    return (
      <Typography color="grey.900" className="font-inter font-medium text-sm">
        {value?.stock}
      </Typography>
    );
  }

  if (type === TABLE_ROW_TYPE.CATEGORY) {
    return (
      <Typography color="grey.900" className="font-inter font-medium text-sm">
        {value?.category?.name}
      </Typography>
    );
  }

  if (type === TABLE_ROW_TYPE.SUB_CATEGORY) {
    return (
      <Typography color="grey.900" className="font-inter font-medium text-sm">
        {value?.subcategory?.name}
      </Typography>
    );
  }

  if (type === TABLE_ROW_TYPE.PRODUCT_NAME) {
    return (
      <div className="flex items-center gap-2">
        <Avatar
          src={value?.displayImage}
          alt={value?.name}
          className="rounded-md w-20 h-20"
        />
        <div>
          <Typography
            color="grey.900"
            className="font-crimson font-bold text-md max-w-[200px] capitalize"
          >
            {value?.name}
          </Typography>
          <div className="flex items-center space-x-1">
            <Calendar color="#027A48" width={18} height={18} />
            <Typography
              color="grey.600"
              className="font-inter font-thin text-xs capitalize"
            >
              ({transformDate(value?.createdAt)})
            </Typography>
          </div>
        </div>
      </div>
    );
  }

  if (type === TABLE_ROW_TYPE.ORDER_PRODUCT_NAME) {
    return (
      <>
        {value?.items?.map((product: any, index: any) => (
          <Typography
            key={`${product?.product?.id}${index}`}
            color="grey.900"
            className="font-crimson font-bold text-md max-w-[200px] capitalize"
          >
            {product?.product?.name} {value?.items?.length > 1 ? ", " : ""}
          </Typography>
        ))}
      </>
    );
  }

  if (type === TABLE_ROW_TYPE.ORDER_NAME) {
    const orderCount = Number(value?.items?.length) || 0;
    return (
      <div className="flex items-center gap-2">
        <AvatarGroup
          className="flex items-center justify-end w-6 h-6"
          total={orderCount}
        >
          {value?.items?.map((product: any, index: number) => {
            return (
              <Avatar
                src={product?.product?.displayImage}
                alt={product?.product.name}
                className="rounded-md w-10 h-10"
                key={`${product?.product?.id}${index}`}
              />
            );
          })}
        </AvatarGroup>
      </div>
    );
  }

  if (type === TABLE_ROW_TYPE.ORDER_STATUS) {
    return <OrderStatus status={value?.status} />;
  }

  if (type === TABLE_ROW_TYPE.ORDERED_ITEM_COUNT) {
    return (
      <div>
        <Typography
          color="grey.900"
          className="font-crimson font-bold text-md max-w-[200px] capitalize"
        >
          {value?.items?.length}
        </Typography>
      </div>
    );
  }

  if (type === TABLE_ROW_TYPE.CREATED_AT_DATE) {
    return (
      <div>
        <Typography
          color="grey.900"
          className="font-crimson font-bold text-md max-w-[200px] capitalize"
        >
          {transformDate(value?.createdAt)}
        </Typography>
      </div>
    );
  }

  if (type === TABLE_ROW_TYPE.UPDATED_AT_DATE) {
    return (
      <div>
        <Typography
          color="grey.900"
          className="font-crimson font-bold text-md max-w-[200px] capitalize"
        >
          {transformDate(value?.updatedAt)}
        </Typography>
      </div>
    );
  }

  return <>Nil</>;
};

export default TableText;
