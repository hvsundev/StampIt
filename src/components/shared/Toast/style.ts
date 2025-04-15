import styled from "@emotion/styled";

export const ToastWrapper = styled.div<{
  type: string;
  position: "top" | "bottom";
}>`
  position: fixed;
  ${({ position }) => (position === "top" ? "top: 15%;" : "bottom: 15%;")}
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ type, theme }) => {
    switch (type) {
      case "success":
      case "info":
        return theme.colors.primary[500];
      case "error":
      case "warning":
        return theme.colors.red[500];
      default:
        return "#333";
    }
  }};
  color: ${({ theme }) => theme.colors.base.white};
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.3px;
  padding: 12px 24px;
  border-radius: 12px;
  z-index: 9999;
  opacity: 0.9;
  box-shadow: ${({ theme }) => theme.colors.gray.opacity70};
`;
