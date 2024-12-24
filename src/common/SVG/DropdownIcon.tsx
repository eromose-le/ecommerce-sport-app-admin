import { IconButton } from "@mui/material";
import { FC } from "react";

interface DropdownIconProps {
  isOpen?: boolean;
  toggle?: any;
}
const DropdownIcon: FC<DropdownIconProps> = ({ isOpen, toggle }) => {
  return (
    <IconButton onClick={toggle}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.3s ease",
        }}
      >
        <path
          d="M6 9L12 15L18 9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconButton>
  );
};

export default DropdownIcon;
