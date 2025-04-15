import React, { useEffect, useRef, useState } from "react";
import * as S from "./style.ts";
import { usePDFFileManager } from "@/context/usePDFFileManager";
import { useDialog } from "@/context/useDialog";
import DropZone from "@/features/FileUploader/components/DropZone";
import StepTitle from "@/features/FileUploader/components/StepTitle";
import Count from "@/features/FileUploader/components/Count";
import Button from "@/components/shared/Button";
import { PDF_UPLOAD_LIMIT } from "@/constants/limits.ts";

const PDFUploader = () => {
  const { showConfirm, showToast } = useDialog();
  const { PDFFile, setPDFFile, handleInitialize } = usePDFFileManager();
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
        <StepTitle title={"PDF"} step={1} />
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />
        <Button label={"업로드"} onClick={handleClick} disabled={!!PDFFile} />
      </S.UploadHeader>

      <S.UploadContent>
        <DropZone
          file={PDFFile}
          isDragging={isDragging}
          onClick={PDFFile ? handlePDFRemove : handleClick}
          onDrop={handleDrop}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          onDragOver={(e) => e.preventDefault()}
        />
        <Count current={PDFFile ? 1 : 0} max={PDF_UPLOAD_LIMIT} />
      </S.UploadContent>
    </S.Uploader>
  );
};

export default PDFUploader;
