import React from "react";
import styled from "@emotion/styled";
import { ButtonTheme } from "./Button.types";

export const ButtonWrapper = styled.button<{
  themeStyle: ButtonTheme;
  disabled?: boolean;
}>(({ themeStyle, disabled }) => {
  const base = {
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    transition: "all 0.2s ease",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
  };

  const themes: Record<ButtonTheme, React.CSSProperties> = {
    [ButtonTheme.Primary]: {
      backgroundColor: "#3b82f6",
      color: "#fff",
      border: "none",
    },
    [ButtonTheme.Secondary]: {
      backgroundColor: "#6b7280",
      color: "#fff",
      border: "none",
    },
    [ButtonTheme.Line]: {
      backgroundColor: "transparent",
      color: "#374151",
      border: "1px solid #d1d5db",
    },
  };

  return {
    ...base,
    ...themes[themeStyle],
  };
});
