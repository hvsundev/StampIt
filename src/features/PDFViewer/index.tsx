import { useEffect, useRef } from "react";
import * as fabric from "fabric";
import * as S from "./style.ts";
import { PDFDocument } from "pdf-lib";
import { getImageByFile } from "@/utils/utils.ts";
import { usePDF } from "@/context/usePDFContext";

const FABRIC_CANVAS_WIDTH = 500;
const FABRIC_CANVAS_HEIGHT = parseFloat(
  (FABRIC_CANVAS_WIDTH * Math.sqrt(2)).toFixed(2),
);

const PDFViewer = () => {
  const { PDFFile, stamps } = usePDF();
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

  // PDF 로딩
  useEffect(() => {
    if (!PDFFile || !canvasRef.current) return;

    if (fabricCanvasRef.current) {
      // TODO: 캔버스 여러개 추가할 수 있도록 처리
      fabricCanvasRef.current.dispose();
    }

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

  // 이미지 스탬프 추가
  useEffect(() => {
    if (!fabricCanvasRef.current || !stamps || stamps.length === 0) return;

    stamps.forEach((stamp, index) => {
      const img = new Image();
      img.onload = () => {
        const imgObj = new fabric.Image(img, {
          left: 50 + index * 50, // 각 이미지가 겹치지 않게 위치 조정
          top: 50 + index * 50,
          scaleX: 0.3,
          scaleY: 0.3,
          selectable: true,
        });

        fabricCanvasRef.current!.add(imgObj);
        fabricCanvasRef.current!.renderAll();
        console.log(`✅ 스탬프 이미지 ${index + 1} 추가 완료!`);
      };

      img.crossOrigin = "anonymous";
      img.src = stamp.image;
    });
  }, [stamps]);

  return (
    <S.PDFViewerWrapper>
      <S.CanvasWrapper>
        <canvas ref={canvasRef} />
      </S.CanvasWrapper>
    </S.PDFViewerWrapper>
  );
};

export default PDFViewer;
