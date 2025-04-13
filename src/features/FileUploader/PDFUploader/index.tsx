import React, { useRef } from "react";
import * as S from "@/features/FileUploader/style.ts";
import Button from "@/components/common/Button/Button.tsx";
import { usePDF } from "@/context/usePDFContext";
import { File } from "@/features/FileUploader/style.ts";

const PDF_UPLOAD_LIMIT = 1;

const PDFUploader = () => {
  const { PDFFile, setPDFFile, handleInitialize } = usePDF();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPDFFile(file);
    }
    e.target.value = "";
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setPDFFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handlePDFRemove = () => {
    const confirmDelete = window.confirm(
      "지금까지 편집한 내용이 사라지는데 진짜 삭제할거야?",
    );
    if (confirmDelete) {
      handleInitialize();
    }
  };

  return (
    <S.Uploader>
      <S.UploadHeader>
        <S.UploadTitle>
          <S.StepNumbering>1</S.StepNumbering>
          <S.Title>PDF</S.Title>
        </S.UploadTitle>
        <input
          ref={inputRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />
        <Button label={"업로드"} onClick={handleClick} disabled={!!PDFFile} />
      </S.UploadHeader>

      <S.UploadContent>
        <S.DropArea
          onClick={PDFFile ? handlePDFRemove : handleClick}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          isExistFile={!!PDFFile}
        >
          {PDFFile ? (
            <S.File>
              <span>📄 {PDFFile?.name}</span>
            </S.File>
          ) : (
            <p>
              PDF 파일을 이 곳에 드래그하거나
              <br />
              클릭하여 업로드 할 수 있어요
            </p>
          )}
        </S.DropArea>
        <S.Count>
          <span>{PDFFile ? 1 : 0}</span>/{PDF_UPLOAD_LIMIT}
        </S.Count>
      </S.UploadContent>
    </S.Uploader>
  );
};

export default PDFUploader;
