import React from "react";
import EmptyStampImage from "@/assets/images/stamp_empty.svg";
import DeleteIcon from "@/assets/images/delete.svg";
import * as S from "./style";

interface StampItemProps {
  index: number;
  stampSrc?: string;
  onSelect: () => void;
  onUpload: () => void;
  onDelete: () => void;
}

const StampItem: React.FC<StampItemProps> = ({
  stampSrc,
  onSelect,
  onUpload,
  onDelete,
}) => {
  const handleClick = () => {
    if (stampSrc) {
      onSelect();
    } else {
      onUpload();
    }
  };

  return (
    <S.StampImage isEmpty={!stampSrc} onClick={handleClick}>
      {stampSrc && (
        <S.DeleteButton
          className="delete-button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <img src={DeleteIcon} alt="삭제 아이콘" />
        </S.DeleteButton>
      )}
      <img src={stampSrc || EmptyStampImage} alt="no-image" />
    </S.StampImage>
  );
};

export default StampItem;
