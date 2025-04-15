import * as S from "./styles.ts";
import { usePDFFileManager } from "@/context/usePDFFileManager";
import Button from "@/components/shared/Button";
import { PDFDocument } from "pdf-lib";
import * as fabric from "fabric";
import downloadIcon from "@/assets/images/download.svg";
import { ButtonSize } from "@/components/shared/Button/interface.ts";
import { useCallback, useState } from "react";

interface ViewerControllerProps {
  canvasRefs: React.MutableRefObject<fabric.Canvas[]>;
}

const ViewerController = ({ canvasRefs }: ViewerControllerProps) => {
  const { PDFFile, scale, setScale } = usePDFFileManager();
  const [isDownloading, setIsDownloading] = useState(false);

  const handlePDFDownload = async () => {
    if (!PDFFile || isDownloading) return;
    setIsDownloading(true);

    try {
      const doc = await PDFDocument.create();

      for (const canvas of canvasRefs.current) {
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        canvas.requestRenderAll();

        const dataUrl = canvas.toDataURL();
        const png = await fetch(dataUrl).then((res) => res.arrayBuffer());
        const img = await doc.embedPng(png);
        const page = doc.addPage([img.width, img.height]);
        page.drawImage(img, {
          x: 0,
          y: 0,
          width: img.width,
          height: img.height,
        });

        canvas.zoomToPoint(
          new fabric.Point(canvas.getWidth() / 2, canvas.getHeight() / 2),
          scale,
        );
      }

      const pdfBytes = await doc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "stamped.pdf";
      link.click();
    } catch (error) {
      alert("PDF 다운로드 중 오류가 발생했습니다.");
      console.error(error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleZoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev + 0.1, 2));
  }, [setScale]);

  const handleZoomOut = useCallback(() => {
    setScale((prev) => Math.max(prev - 0.1, 0.2));
  }, [setScale]);

  return (
    <S.ViewerController>
      <S.FileName>{PDFFile?.name}</S.FileName>
      <S.Controls>
        {PDFFile && (
          <S.ZoomControls>
            <S.ZoomButton onClick={handleZoomOut}>−</S.ZoomButton>
            <S.ZoomLevel>{Math.round(scale * 100)}%</S.ZoomLevel>
            <S.ZoomButton onClick={handleZoomIn}>＋</S.ZoomButton>
          </S.ZoomControls>
        )}
        <Button
          label="PDF 다운로드"
          size={ButtonSize.Large}
          onClick={handlePDFDownload}
          rounded={false}
          leftIcon={downloadIcon}
          disabled={!PDFFile || isDownloading}
        />
      </S.Controls>
    </S.ViewerController>
  );
};

export default ViewerController;
