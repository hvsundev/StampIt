import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { ButtonTheme, ButtonSize } from "./interface.ts";

export const ButtonWrapper = styled.button<{
  themeStyle: ButtonTheme;
  disabled?: boolean;
  rounded?: boolean;
  size?: ButtonSize;
}>(({ themeStyle, disabled, rounded, size = ButtonSize.Medium }) => {
  const sizeStyles = {
    [ButtonSize.Small]: css`
      font-size: 12px;
      padding: 6px 12px;
    `,
    [ButtonSize.Medium]: css`
      font-size: 14px;
      padding: 8px 16px;
    `,
    [ButtonSize.Large]: css`
      font-size: 16px;
      padding: 12px 20px;
    `,
  };

  const base = css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: ${rounded ? "8px" : "0"};
    transition: all 0.2s ease;
    cursor: ${disabled ? "not-allowed" : "pointer"};
    opacity: ${disabled ? 0.5 : 1};
    ${disabled && "pointer-events: none"};
    height: 100%;
    font-weight: 700;
    ${sizeStyles[size]}
  `;

  const themeStyles = {
    [ButtonTheme.Primary]: css`
      background-color: #3b82f6;
      color: #fff;
      border: none;
      &:hover {
        background-color: #2563eb;
      }
      &:active {
        background-color: #1d4ed8;
      }
    `,
    [ButtonTheme.Secondary]: css`
      background-color: #d6e3ff;
      color: #1e3a8a;
      border: none;
      &:hover {
        background-color: #c2d4ff;
      }
      &:active {
        background-color: #a7c0ff;
      }
    `,
    [ButtonTheme.Line]: css`
      background-color: transparent;
      color: #374151;
      border: 1px solid #d1d5db;
      &:hover {
        background-color: #f3f4f6;
      }
      &:active {
        background-color: #e5e7eb;
      }
    `,
  };

  return [base, themeStyles[themeStyle]];
});
