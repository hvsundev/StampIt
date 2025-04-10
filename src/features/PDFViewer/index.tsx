import { useEffect, useRef } from "react";
import * as fabric from "fabric";
import { PDFDocument } from "pdf-lib";

import { getImageByFile } from "@/utils/utils.ts";
import * as S from "./style.ts";
import Button from "@/components/common/Button/Button.tsx";
import { usePDF } from "@/context/usePDFContext";

const FABRIC_CANVAS_WIDTH = 500;
const FABRIC_CANVAS_HEIGHT = parseFloat(
  (FABRIC_CANVAS_WIDTH * Math.sqrt(2)).toFixed(2),
);

const PDFViewer = () => {
  const { PDFFile } = usePDF();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  const handlePDFDownload = async () => {
    if (!fabricCanvasRef.current) return;

    const dataUrl = fabricCanvasRef.current.toDataURL({
      format: "png",
      multiplier: 2,
    });

    const PDFDoc = await PDFDocument.create();
    const page = PDFDoc.addPage();

    const pngImageBytes = await fetch(dataUrl).then((res) => res.arrayBuffer());
    const pngImage = await PDFDoc.embedPng(pngImageBytes);

    const { width, height } = pngImage.scale(1);
    page.setSize(width, height);
    page.drawImage(pngImage, {
      x: 0,
      y: 0,
      width,
      height,
    });

    const pdfBytes = await PDFDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = "stamped.pdf";
    a.click();
    URL.revokeObjectURL(blobUrl);
  };

  useEffect(() => {
    if (!PDFFile || !canvasRef.current) return;

    fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
      width: FABRIC_CANVAS_WIDTH,
      height: FABRIC_CANVAS_HEIGHT,
      selection: false,
    });

    (async () => {
      const image = await getImageByFile(PDFFile);

      const img = await fabric.FabricImage.fromURL(image!);

      img.set({
        objectCaching: false,
      });

      fabricCanvasRef.current!.backgroundImage = img;
      fabricCanvasRef.current?.requestRenderAll();
    })();
  }, [PDFFile]);

  return (
    <S.PDFViewerWrapper>
      <S.CanvasWrapper>
        <canvas ref={canvasRef} />
        <Button label="PDF 다운로드" onClick={handlePDFDownload} />
      </S.CanvasWrapper>
    </S.PDFViewerWrapper>
  );
};

export default PDFViewer;
