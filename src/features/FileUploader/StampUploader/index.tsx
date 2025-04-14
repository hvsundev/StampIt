import * as S from "./style.ts";
import Button from "@/components/common/Button";
import React, { useRef } from "react";
import { usePDFFileManager } from "@/context/usePDFFileManager";
import StampItem from "@/features/FileUploader/components/StampItem";
import { useDialog } from "@/context/useDialog";
import Count from "@/features/FileUploader/components/Count";
import StepTitle from "@/features/FileUploader/components/StepTitle";

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
        <StepTitle title={"도장 이미지"} step={2} />
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
        <S.Description>* PNG 파일만 업로드 가능</S.Description>
        <Count current={stamps.length} max={IMAGE_UPLOAD_LIMIT} />
      </S.UploadContent>
    </S.Uploader>
  );
};

export default StampUploader;
