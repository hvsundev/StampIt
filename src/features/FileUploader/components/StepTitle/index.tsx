import React from "react";
import * as S from "./style.ts";

interface StepTitleProps {
  step: number;
  title: string;
}

const StepTitle: React.FC<StepTitleProps> = ({ step, title }) => {
  return (
    <S.UploadTitle>
      <S.StepNumbering>{step}</S.StepNumbering>
      <S.Title>{title}</S.Title>
    </S.UploadTitle>
  );
};

export default StepTitle;
