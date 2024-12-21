import { FC } from "react";
import { Avatar, Typography, Chip } from "@mui/material";
import { Calendar } from "@untitled-ui/icons-react";
import { TABLE_ROW_TYPE } from "@/constants/enums";
import { formatCurrency } from "@/utils/currencyUtils";
import { transformDate } from "@/utils/dateUtils";

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

  return <>Nil</>;
};

export default TableText;
