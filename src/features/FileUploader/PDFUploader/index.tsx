import React, { useEffect, useRef, useState } from "react";
import * as S from "@/features/FileUploader/style.ts";
import Index from "@/components/common/Button";
import { usePDF } from "@/context/usePDFContext";
import { useDialog } from "@/context/useDialog";

const PDF_UPLOAD_LIMIT = 1;

const PDFUploader = () => {
  const { showConfirm } = useDialog();
  const { PDFFile, setPDFFile, handleInitialize } = usePDF();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

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

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (PDFFile) {
      const confirmed = await showConfirm({
        title: "PDF 삭제",
        description: `지금까지 편집한 내용이 사라져요\n새로운 작업을 시작할까요?`,
      });

      if (!confirmed) return;
    }

    setPDFFile(file);
    e.dataTransfer.clearData();
  };

  const handlePDFRemove = async () => {
    const confirmed = await showConfirm({
      title: "PDF 삭제",
      description: `지금까지 편집한 내용이 사라져요\n정말 삭제할까요?`,
    });

    if (confirmed) {
      handleInitialize();
    }
  };

  useEffect(() => {
    const preventDefault = (e: DragEvent) => {
      e.preventDefault();
    };

    window.addEventListener("dragover", preventDefault);
    window.addEventListener("drop", preventDefault);

    return () => {
      window.removeEventListener("dragover", preventDefault);
      window.removeEventListener("drop", preventDefault);
    };
  }, []);

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
          accept=".pdf"
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />
        <Index label={"업로드"} onClick={handleClick} disabled={!!PDFFile} />
      </S.UploadHeader>

      <S.UploadContent>
        <S.DropArea
          onClick={PDFFile ? handlePDFRemove : handleClick}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          isExistFile={!!PDFFile}
          isDragging={isDragging}
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
