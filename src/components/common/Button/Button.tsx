import React from "react";
import { ButtonProps, ButtonTheme } from "./interface.ts";
import { ButtonWrapper } from "./style.ts";

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  type = "button",
  theme = ButtonTheme.Primary,
  disabled = false,
  loading = false,
}: ButtonProps) => {
  if (loading) return "로딩 중...";

  return (
    <ButtonWrapper
      type={type}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      themeStyle={theme}
    >
      {label}
    </ButtonWrapper>
  );
};

export default Button;
