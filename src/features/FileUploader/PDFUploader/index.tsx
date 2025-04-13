import React, { useRef } from "react";
import * as S from "@/features/FileUploader/style.ts";
import Button from "@/components/common/Button/Button.tsx";
import { usePDF } from "@/context/usePDFContext";

const PDF_UPLOAD_LIMIT = 1;

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
      <S.Uploader>
        <S.UploadHeader>
          <S.UploadTitle>
            <S.StepNumbering>1</S.StepNumbering>
            <S.Title>PDF 파일 업로드</S.Title>
          </S.UploadTitle>
          <input
            ref={pdfInputRef}
            type="file"
            onChange={handlePDFChange}
            style={{ display: "none" }}
          />
          <Button label={"업로드"} onClick={handlePDFUpload} />
        </S.UploadHeader>
        <S.UploadContent>
          {PDFFile ? (
            <S.PDFFile>
              {!!PDFFile?.name && (
                <S.File>
                  <strong>📄 {PDFFile?.name}</strong>
                  <S.RemoveButton>
                    <Button label={"X"} onClick={handlePDFRemove} />
                  </S.RemoveButton>
                </S.File>
              )}
            </S.PDFFile>
          ) : (
            <div>파일을 끌어다 놓으세요</div>
          )}
          <S.Count>
            <span>{`${PDFFile ? 1 : 0}`}</span>
            {`/${PDF_UPLOAD_LIMIT}`}
          </S.Count>
        </S.UploadContent>
      </S.Uploader>
    </>
  );
};

export default PDFUploader;
