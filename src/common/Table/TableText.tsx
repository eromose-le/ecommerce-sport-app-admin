import { FC } from "react";
import { styled } from "@mui/material/styles";
import { Badge, Avatar, Typography, Chip } from "@mui/material";
import { MarkerPin02 } from "@untitled-ui/icons-react";
import { TABLE_ROW_TYPE } from "@/constants/enums";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

interface TableTextProps {
  type: string;
  value?: any;
}
const TableText: FC<TableTextProps> = ({ type, value }) => {
  if (type === TABLE_ROW_TYPE.AGENT_NAME) {
    return (
      <div className="flex items-center justify-start gap-3">
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar sizes="40" src={value?.avatar} alt="agent-image" />
        </StyledBadge>
        <div>
          <Typography
            color="grey.900"
            className="font-inter font-medium text-sm capitalize"
          >
            {value?.firstName} {value?.lastName}
          </Typography>
          <Typography
            color="grey.400"
            className="font-inter font-medium text-sm w-64 md:w-full overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {value?.email}
          </Typography>
        </div>
      </div>
    );
  }

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

  if (type === TABLE_ROW_TYPE.PRICE) {
    return (
      <Typography color="grey.900" className="font-inter font-medium text-sm">
        {value?.price}
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
            className="font-crimson font-bold text-lg max-w-[200px] capitalize"
          >
            {value?.name}
          </Typography>
          <div className="flex items-center space-x-1">
            <MarkerPin02 color="#027A48" width={12} height={12} />
            <Typography
              color="grey.600"
              className="font-inter font-medium text-xs capitalize"
            >
              {value?.city?.title}, {value?.state?.title}
            </Typography>
          </div>
        </div>
      </div>
    );
  }

  return <>Nil</>;
};

export default TableText;
