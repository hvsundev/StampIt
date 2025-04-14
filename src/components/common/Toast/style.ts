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
        return "#4caf50";
      case "error":
        return "#f44336";
      case "info":
        return "#2196f3";
      case "warning":
        return "#ff9800";
      default:
        return "#333";
    }
  }};
  color: white;
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 14px;
  z-index: 9999;
  opacity: 0.9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;
