import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";

import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { Menu, MenuProps } from "@mui/material";
import { ChevronDown } from "@untitled-ui/icons-react";
import UserImage from "@/assets/images/user.jpeg";
import useLogout from "@/hooks/useLogout";
import useAuthUser from "@/hooks/useAuthUser";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(0.5),
    minWidth: 180,
    color: theme.palette.grey[900],
    backgroundColor: alpha(theme.palette.grey[100], 1),
    // boxShadow:
    //   "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.grey[900],
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(theme.palette.grey[100], 1),
      },
    },
  },
}));

export default function MenuDropdown() {
  const user = useAuthUser();
  const { logout } = useLogout();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        className="px-5 py-3 m-0 min-w-[300px]"
        size="large"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="ghost"
        disableElevation
        onClick={handleClick}
        endIcon={<ChevronDown />}
      >
        <div className="flex items-center justify-center gap-3">
          <img
            src={user?.avatar || UserImage}
            alt="User-image"
            className="w-12 h-12 rounded-full"
          />
          <div className="flex flex-col items-start pr-4 leading-snug">
            <p className="capitalize font-inter font-bold text-base line-clamp-1">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="lowercase font-inter font-medium text-xs line-clamp-1">
              {user?.email}
            </p>
          </div>
        </div>
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          Profile
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          Settings
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={logout} disableRipple>
          Log out
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
