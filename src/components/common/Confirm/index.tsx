import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import * as S from "./style.ts";
import Button from "@/components/common/Button";
import { ButtonTheme } from "@/components/common/Button/interface";

interface ConfirmProps {
  title: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Confirm = ({ title, description, onConfirm, onCancel }: ConfirmProps) => {
  const formatDescription = (text: string): React.ReactNode[] => {
    return text.split(/(\n|<br\s*\/?>)/g).map((part, index) => {
      if (part === "\n" || part.match(/<br\s*\/?>/)) {
        return <br key={index} />;
      }
      return <span key={index}>{part}</span>;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return ReactDOM.createPortal(
    <S.Overlay onClick={handleOverlayClick}>
      <S.ConfirmBox onClick={(e) => e.stopPropagation()}>
        <S.Title>{title}</S.Title>
        {description && (
          <S.Description>{formatDescription(description)}</S.Description>
        )}
        <S.ButtonGroup>
          <Button
            label="취소"
            theme={ButtonTheme.Secondary}
            onClick={onCancel}
          />
          <Button
            label="확인"
            theme={ButtonTheme.Primary}
            onClick={onConfirm}
          />
        </S.ButtonGroup>
      </S.ConfirmBox>
    </S.Overlay>,
    document.body,
  );
};

export default Confirm;
