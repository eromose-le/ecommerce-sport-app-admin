import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (e?: any) => void | any;
  children: React.ReactNode;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: React.CSSProperties;
  size?: "sm" | "md" | "lg";
  variant?: "contained" | "outlined" | "link" | "ghost"; // New variant prop
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  style,
  size = "md",
  variant = "contained", // Default variant
  ...props
}) => {
  const sizeClasses = {
    sm: "py-2 px-3 text-sm",
    md: "py-3 px-4 text-base",
    lg: "py-3 px-4 text-lg",
  };

  // Define variant styles
  const variantClasses = {
    contained:
      "bg-purple-link text-primary-foreground hover:bg-purple-link-600",
    outlined:
      "border border-purple-link text-purple-dark bg-transparent hover:text-purple-dark",
    link: "text-purple-link hover:underline",
    ghost:
      "text-purple-dark border-2 border-purple-link bg-[#F8F8FC] hover:bg-grey-lighter",
  };

  // Define transition and animation classes
  const transitionClasses =
    "transition-colors duration-300 ease-in-out group-hover:delay-150";
  const scaleClasses =
    "transform transition-[transform] hover:scale-105 group-hover:scale-105";

  return (
    <button
      onClick={onClick}
      className={cn(
        "font-inter font-medium rounded-lg flex items-center justify-center gap-1 cursor-pointer",
        sizeClasses[size],
        variantClasses[variant], // Apply variant classes
        transitionClasses, // Apply transition classes
        scaleClasses, // Apply animation classes
        className
      )}
      style={style}
      {...props}
    >
      {LeftIcon && (
        <span className={`pr-${size === "sm" ? "1" : "2"}`}>{LeftIcon}</span>
      )}
      {children}
      {RightIcon && (
        <span className={`pl-${size === "sm" ? "1" : "2"}`}>{RightIcon}</span>
      )}
    </button>
  );
};

export default Button;
