import React from "react";
import * as S from "./style.ts";

interface DropZoneProps {
  file: File | null;
  isDragging: boolean;
  onClick: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: () => void;
  onDragLeave: () => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}

const DropZone: React.FC<DropZoneProps> = ({
  file,
  isDragging,
  onClick,
  onDrop,
  onDragEnter,
  onDragLeave,
  onDragOver,
}) => {
  return (
    <S.DropArea
      onClick={onClick}
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      isExistFile={!!file}
      isDragging={isDragging}
    >
      {file ? (
        <S.File>
          <span>📄 {file.name}</span>
        </S.File>
      ) : (
        <p>
          PDF 파일을 이 곳에 드래그하거나
          <br />
          클릭하여 업로드 할 수 있어요
        </p>
      )}
    </S.DropArea>
  );
};

export default DropZone;
