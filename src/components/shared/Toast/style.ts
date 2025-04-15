import styled from "@emotion/styled";

export const ToastWrapper = styled.div<{
  type: string;
  position: "top" | "bottom";
}>`
  position: fixed;
  ${({ position }) => (position === "top" ? "top: 15%;" : "bottom: 15%;")}
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ type }) => {
    switch (type) {
      case "success":
      case "info":
        return "rgba(33,150,243,0.7)";
      case "error":
      case "warning":
        return "rgba(244,67,54,0.7)";
      default:
        return "#333";
    }
  }};
  color: white;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.3px;
  padding: 12px 24px;
  border-radius: 12px;
  z-index: 9999;
  opacity: 0.9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;
