import { FC } from "react";
import { styled } from "@mui/material/styles";
import { Badge, Avatar, Typography, Chip, AvatarGroup } from "@mui/material";
import { CheckVerified01, MarkerPin02 } from "@untitled-ui/icons-react";
import { AGENT_APPROVAL_STATUS, TABLE_ROW_TYPE } from "@/constants/enums";

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

  if (type === TABLE_ROW_TYPE.SUSPENDED) {
    return (
      <>
        {value?.accountSuspended ? (
          <Chip
            color="success"
            className="text-xs font-inter font-medium"
            icon={<span className="w-2 h-2 rounded-full bg-[#1BA879]"></span>}
            label="false"
          />
        ) : (
          <Chip
            color="error"
            icon={<span className="w-2 h-2 rounded-full bg-[#F04438]"></span>}
            label="true"
          />
        )}
      </>
    );
  }

  if (type === TABLE_ROW_TYPE.APPROVAL_STATUS) {
    if (value?.agentDoc) {
      if (value?.agentDoc?.status === AGENT_APPROVAL_STATUS.PENDING) {
        return (
          <Chip
            color="default"
            icon={<CheckVerified01 color="#f79007" />}
            label={value?.agentDoc?.status}
          />
        );
      }
      if (value?.agentDoc?.status === AGENT_APPROVAL_STATUS.APPROVED) {
        return (
          <Chip
            color="default"
            icon={<CheckVerified01 color="#027A48" />}
            label={value?.agentDoc?.status}
          />
        );
      }
      if (value?.agentDoc?.status === AGENT_APPROVAL_STATUS.REJECTED) {
        return (
          <Chip
            color="default"
            icon={<CheckVerified01 color="#F04438" />}
            label={value?.agentDoc?.status}
          />
        );
      }
    } else {
      return (
        <Chip
          color="default"
          icon={<CheckVerified01 color="#eee" />}
          label="UnVerified"
        />
      );
    }
  }

  if (type === TABLE_ROW_TYPE.TEAMS) {
    return (
      <>
        <Chip color="info" label="Marketing" />
        <Chip color="success" label="Design" />
      </>
    );
  }

  if (type === TABLE_ROW_TYPE.ROLE) {
    return (
      <div>
        <Typography color="grey.900" className="font-inter font-medium text-sm">
          Tanner Finsha
        </Typography>
        <Typography color="grey.400" className="font-inter font-medium text-sm">
          Tannerfisher@gmail.com
        </Typography>
      </div>
    );
  }

  if (type === TABLE_ROW_TYPE.EMPLOYEE_ID) {
    return <Chip color="info" label="Marketing" />;
  }

  if (type === TABLE_ROW_TYPE.NAME) {
    return (
      <Typography color="grey.900" className="font-inter font-medium text-sm">
        Tanner Finsha
      </Typography>
    );
  }

  if (type === TABLE_ROW_TYPE.APARTMENT_LIST) {
    return (
      <AvatarGroup className="flex items-center justify-end" total={24}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
      </AvatarGroup>
    );
  }

  if (type === TABLE_ROW_TYPE.TITLE_OF_PROPERTY) {
    return (
      <div>
        <Typography
          color="grey.900"
          className="font-crimson font-bold text-lg max-w-[200px]"
        >
          3-bedroom detached bungalow
        </Typography>
        <div className="flex items-center space-x-1">
          <MarkerPin02 color="#027A48" width={12} height={12} />
          <Typography
            color="grey.600"
            className="font-inter font-medium text-xs"
          >
            Ikeja, Lagos
          </Typography>
        </div>
      </div>
    );
  }

  return <>Nil</>;
};

export default TableText;
