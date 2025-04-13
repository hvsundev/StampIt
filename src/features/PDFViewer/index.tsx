import { useEffect, useMemo, useRef, useState } from "react";
import * as fabric from "fabric";
import { PDFDocument } from "pdf-lib";

import { getImagesByFile } from "@/utils/utils.ts";
import * as S from "./style.ts";
import Button from "@/components/common/Button/Button.tsx";
import { usePDF } from "@/context/usePDFContext";
import { ButtonTheme } from "@/components/common/Button/interface.ts";
import PDFPreview from "@/features/PDFViewer/PDFPreview";

const FABRIC_CANVAS_WIDTH = 500;
const FABRIC_CANVAS_HEIGHT = parseFloat(
  (FABRIC_CANVAS_WIDTH * Math.sqrt(2)).toFixed(2),
);

const PDFViewer = () => {
  const {
    PDFFile,
    selectedPDFIndex,
    stamps,
    selectedStampIndex,
    handleInitialize,
  } = usePDF();
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasRefs = useRef<fabric.Canvas[]>([]);

  const [pdfPages, setPdfPages] = useState<string[]>([]);

  const activeCanvas = useMemo(() => {
    return canvasRefs.current[selectedPDFIndex];
  }, [selectedPDFIndex]);

  const mountCanvas = (container: HTMLDivElement, canvas: fabric.Canvas) => {
    container.innerHTML = "";
    container.appendChild(canvas.wrapperEl);
    canvas.requestRenderAll();
  };

  const createDeleteHandler = (canvas: fabric.Canvas) => {
    return (e: KeyboardEvent) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        const activeObj = canvas.getActiveObject();
        if (activeObj) {
          canvas.remove(activeObj);
          canvas.discardActiveObject();
          canvas.requestRenderAll();
        }
      }
    };
  };

  const handleStampDelete = () => {
    const activeObj = activeCanvas.getActiveObject();
    if (activeObj) {
      activeCanvas.remove(activeObj);
      activeCanvas.discardActiveObject();
      activeCanvas.requestRenderAll();
    }
  };

  const handleStampDraw = () => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const imgObj = new fabric.Image(img, {
        left: 150,
        top: 150,
        scaleX: 0.3,
        scaleY: 0.3,
      });

      activeCanvas.add(imgObj);
      activeCanvas.setActiveObject(imgObj);
      activeCanvas.requestRenderAll();
    };
    img.src = stamps[selectedStampIndex];
    console.log(stamps[selectedStampIndex]);
  };

  const handlePDFDownload = async () => {
    const doc = await PDFDocument.create();

    for (const canvas of canvasRefs.current) {
      const dataUrl = canvas.toDataURL();
      const png = await fetch(dataUrl).then((res) => res.arrayBuffer());
      const img = await doc.embedPng(png);
      const page = doc.addPage([img.width, img.height]);
      page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    }

    const pdfBytes = await doc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "stamped.pdf";
    link.click();
  };

  useEffect(() => {
    if (!PDFFile) {
      canvasRefs.current = [];

      if (canvasContainerRef.current) {
        canvasContainerRef.current.innerHTML = "";
      }

      handleInitialize();
      return;
    }

    (async () => {
      const images = await getImagesByFile(PDFFile);
      setPdfPages(images);

      const newCanvases: fabric.Canvas[] = [];

      for (let i = 0; i < images.length; i++) {
        const rawCanvas = document.createElement("canvas");
        rawCanvas.width = FABRIC_CANVAS_WIDTH;
        rawCanvas.height = FABRIC_CANVAS_HEIGHT;

        if (i === 0 && canvasContainerRef.current) {
          canvasContainerRef.current.innerHTML = "";
          canvasContainerRef.current.appendChild(rawCanvas);
        }

        const fabricCanvas = new fabric.Canvas(rawCanvas, {
          selection: true,
        });
        fabricCanvas.defaultCursor = "move";

        const bgImage = await new Promise<fabric.Image>((resolve) => {
          const image = new Image();
          image.crossOrigin = "anonymous";
          image.onload = () => {
            const fabricImg = new fabric.Image(image, {
              selectable: false,
              evented: false,
            });

            // 🎯 비율 유지하면서 캔버스 크기에 맞추기
            const scaleX = rawCanvas.width / fabricImg.width!;
            const scaleY = rawCanvas.height / fabricImg.height!;
            const scale = Math.min(scaleX, scaleY); // 비율 유지

            fabricImg.scale(scale); // 이미지 크기 조절
            resolve(fabricImg);
          };
          image.src = images[i];
        });

        fabricCanvas.backgroundImage = bgImage;
        fabricCanvas.renderAll();

        newCanvases.push(fabricCanvas);
      }

      canvasRefs.current = newCanvases;
    })();
  }, [PDFFile]);

  useEffect(() => {
    const container = canvasContainerRef.current;

    if (!container || !activeCanvas) return;

    mountCanvas(container, activeCanvas);
    const handleKeyDown = createDeleteHandler(activeCanvas);

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPDFIndex]);

  return (
    <S.PDFViewerContainer>
      {/* 뷰어 컨트롤러 */}
      <S.ViewerController>
        <span>{PDFFile?.name}</span>
        <Button
          label="PDF 다운로드"
          onClick={handlePDFDownload}
          rounded={false}
        />
      </S.ViewerController>

      {/* 뷰어 */}
      <S.Viewer>
        <S.CanvasWrapper>
          <S.Canvas ref={canvasContainerRef} />
        </S.CanvasWrapper>

        <S.FloatingButtonArea>
          <Button
            label="도장 찍기"
            onClick={handleStampDraw}
            theme={ButtonTheme.Secondary}
          />
          <Button
            label="도장 삭제"
            onClick={handleStampDelete}
            theme={ButtonTheme.Secondary}
          />
        </S.FloatingButtonArea>
      </S.Viewer>

      {/* 썸네일 미리보기 */}
      <S.Preview>
        <PDFPreview />
      </S.Preview>
    </S.PDFViewerContainer>
  );
};

export default PDFViewer;
