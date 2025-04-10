import React, { useRef } from "react";
import * as S from "@/features/FileUploader/style.ts";
import Button from "@/components/common/Button/Button.tsx";
import { usePDF } from "@/context/usePDFContext";

const PDFUploader = () => {
  const { PDFFile, setPDFFile } = usePDF();
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const handlePDFUpload = () => {
    pdfInputRef.current?.click();
  };

  const handlePDFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPDFFile(file!);
    e.target.value = "";
  };

  const handlePDFRemove = () => {
    setPDFFile(null);
  };

  return (
    <>
      <S.PDFUpload>
        <input
          ref={pdfInputRef}
          type="file"
          onChange={handlePDFChange}
          style={{ display: "none" }}
        />
        <Button label={"PDF 업로드"} onClick={handlePDFUpload} />
      </S.PDFUpload>

      <S.PDFFile>
        {!!PDFFile?.name && (
          <>
            📄 파일명: <strong>{PDFFile?.name}</strong>
            <S.RemoveButton>
              <Button label={"X"} onClick={handlePDFRemove} />
            </S.RemoveButton>
          </>
        )}
      </S.PDFFile>
    </>
  );
};

export default PDFUploader;
