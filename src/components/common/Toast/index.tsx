import React from "react";
import * as S from "./style.ts";

const Toast = ({
  message,
  type = "info",
  position = "top",
}: {
  message: string;
  type?: string;
  position?: "top" | "bottom";
}) => {
  return (
    <S.ToastWrapper type={type} position={position}>
      {message}
    </S.ToastWrapper>
  );
};

export default Toast;
