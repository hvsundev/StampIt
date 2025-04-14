import * as S from "@/features/FileUploader/style.ts";
import Button from "@/components/common/Button";
import React, { useRef } from "react";
import { usePDFFileManager } from "@/context/usePDFFileManager";
import StampItem from "@/features/FileUploader/components/StempItem";
import { useDialog } from "@/context/useDialog";

const IMAGE_UPLOAD_LIMIT = 5;

const StampUploader = () => {
  const { setSelectedStampIndex, stamps, addStamp, deleteStamp } =
    usePDFFileManager();
  const { showToast } = useDialog();
  const stampInputRef = useRef<HTMLInputElement>(null);

  const handleStampUpload = () => {
    stampInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "image/png") {
      showToast({
        type: "warning",
        message: `PNG 형식의 파일만 업로드할 수 있어요`,
      });

      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUrl = reader.result as string;
      addStamp(imageDataUrl);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <S.Uploader>
      <S.UploadHeader>
        <S.UploadTitle>
          <S.StepNumbering>2</S.StepNumbering>
          <S.Title>도장 이미지</S.Title>
        </S.UploadTitle>
        <input
          ref={stampInputRef}
          type="file"
          accept=".png"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <Button
          label={"업로드"}
          onClick={handleStampUpload}
          disabled={IMAGE_UPLOAD_LIMIT === stamps.length}
        />
      </S.UploadHeader>

      <S.UploadContent>
        <S.Stamps>
          {Array.from({ length: IMAGE_UPLOAD_LIMIT }).map((_, index) => (
            <StampItem
              key={index}
              index={index}
              stampSrc={stamps[index]}
              onSelect={() => setSelectedStampIndex(index)}
              onUpload={handleStampUpload}
              onDelete={() => deleteStamp(index)}
            />
          ))}
        </S.Stamps>
        <S.Description>* 확장자는 'png'로 제한됩니다.</S.Description>
        <S.Count>
          <span>{`${stamps.length}`}</span>
          {`/${IMAGE_UPLOAD_LIMIT}`}
        </S.Count>
      </S.UploadContent>
    </S.Uploader>
  );
};

export default StampUploader;
