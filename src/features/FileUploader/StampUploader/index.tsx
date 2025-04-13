import * as S from "@/features/FileUploader/style.ts";
import Button from "@/components/common/Button/Button.tsx";
import React, { useRef } from "react";
import { usePDF } from "@/context/usePDFContext";

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
      <S.StampUpload>
        <input
          ref={stampInputRef}
          type="file"
          accept=".png"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <Button label={"도장 업로드"} onClick={handleStampUpload} />
      </S.StampUpload>

      <S.Stamps>
        {stamps.map((stamp, index) => (
          <S.StampImage
            key={index}
            src={stamp}
            onClick={() => setSelectedStampIndex(index)}
            isSelected={selectedStampIndex === index}
          />
        ))}
      </S.Stamps>
    </>
  );
};

export default StampUploader;
