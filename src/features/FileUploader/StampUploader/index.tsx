import * as S from "@/features/FileUploader/style.ts";
import Button from "@/components/common/Button/Button.tsx";
import React, { useRef } from "react";
import { usePDF } from "@/context/usePDFContext";

const IMAGE_UPLOAD_LIMIT = 5;

const StampUploader = () => {
  const { selectedStampIndex, setSelectedStampIndex, stamps, addStamp } =
    usePDF();
  const stampInputRef = useRef<HTMLInputElement>(null);

  const handleStampUpload = () => {
    stampInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUrl = reader.result as string;
      addStamp(imageDataUrl);
    };
    reader.readAsDataURL(file);

    e.target.value = "";
  };

  return (
    <>
      <S.Uploader>
        <S.UploadHeader>
          <S.UploadTitle>
            <S.StepNumbering>2</S.StepNumbering>
            <S.Title>도장 파일 업로드</S.Title>
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
            {[0, 1, 2, 3, 4].map((imageIndex) => (
              <S.StampImage
                key={imageIndex}
                src={stamps[imageIndex]}
                onClick={() => setSelectedStampIndex(imageIndex)}
                isSelected={selectedStampIndex === imageIndex}
              />
            ))}
          </S.Stamps>
          <S.Descrition>* 확장자는 'png'로 제한됩니다.</S.Descrition>
          <S.Count>
            <span>{`${stamps.length}`}</span>
            {`/${IMAGE_UPLOAD_LIMIT}`}
          </S.Count>
        </S.UploadContent>
      </S.Uploader>
    </>
  );
};

export default StampUploader;
