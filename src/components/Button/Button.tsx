import React from "react";
import { Button, Button as ButtonBase } from "@mui/material";

interface ButtonProps {
  color?: any | undefined;
  label: string;
  onClick?: () => {};
  variant?: any | undefined;
  width?: string;
  size?: string;
  fullWidth?: boolean;
  //   children: ReactNode;
}

export const ButtonType: React.FC<ButtonProps> = ({
  color,
  variant,
  size,
  label,
  fullWidth,
}) => {
  return <ButtonBase fullWidth={fullWidth} variant={variant} color={color} />;
};
export { Button };
