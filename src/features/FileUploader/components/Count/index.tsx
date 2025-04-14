import React from "react";
import * as S from "./style.ts";

interface UploadCountProps {
  current: number;
  max: number;
}

const UploadCount: React.FC<UploadCountProps> = ({ current, max }) => {
  return (
    <S.Count>
      <span>{current}</span>/{max}
    </S.Count>
  );
};

export default UploadCount;
