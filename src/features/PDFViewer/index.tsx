import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as fabric from "fabric";

import * as S from "./style.ts";
import Button from "@/components/common/Button";
import { usePDF } from "@/context/usePDFContext";
import { ButtonTheme } from "@/components/common/Button/interface.ts";
import PDFPreview from "@/features/PDFViewer/PDFPreview";
import ViewerController from "@/features/PDFViewer/ViewerController";
import { useStampInserter } from "@/hooks/pdfViewer/useStampInserter.ts";
import { useActiveCanvasHandlers } from "@/hooks/pdfViewer/useActiveCanvasHandlers.ts";
import { useFabricCanvases } from "@/hooks/pdfViewer/useFabricCanvases.ts";
import { useCanvasSize } from "@/hooks/pdfViewer/useCanvasSize.ts";

const PDFViewer = () => {
  useCanvasSize();

  const {
    PDFFile,
    stamps,
    selectedPDFIndex,
    selectedStampIndex,
    setSelectedStampIndex,
    handleInitialize,
    canvasSize,
    scale,
  } = usePDF();

  const canvasRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasRefs = useRef<fabric.Canvas[]>([]);

  const [pdfPages, setPdfPages] = useState<string[]>([]);
  const [isExistActiveStamp, setIsExistActiveStamp] = useState(false);

  useFabricCanvases({
    PDFFile,
    canvasSize,
    canvasRef,
    canvasRefs,
    setPdfPages,
    handleInitialize,
  });

  useActiveCanvasHandlers({
    selectedPDFIndex,
    canvasRefs,
    setIsExistActiveStamp,
  });

  useStampInserter({
    selectedStampIndex,
    setSelectedStampIndex,
    stamps,
    canvasRefs,
    selectedPDFIndex,
  });

  const handleStampDelete = () => {
    const activeCanvas = canvasRefs.current[selectedPDFIndex];
    const activeStamp = activeCanvas.getActiveObject();
    if (activeStamp) {
      activeCanvas.remove(activeStamp);
      activeCanvas.discardActiveObject();
      activeCanvas.requestRenderAll();
      setIsExistActiveStamp(false);
    }
  };

  const mountCanvas = useCallback(
    (container: HTMLDivElement, canvas: fabric.Canvas) => {
      container.innerHTML = "";
      container.appendChild(canvas.wrapperEl);
      canvas.requestRenderAll();
    },
    [],
  );

  useEffect(() => {
    const activeCanvas = canvasRefs.current[selectedPDFIndex];
    const container = canvasRef.current;

    if (!container || !activeCanvas) return;

    mountCanvas(container, activeCanvas);
  }, [selectedPDFIndex]);

  useEffect(() => {
    const activeCanvas = canvasRefs.current[selectedPDFIndex];
    if (!activeCanvas) return;

    const center = new fabric.Point(
      activeCanvas.getWidth() / 2,
      activeCanvas.getHeight() / 2,
    );

    activeCanvas.zoomToPoint(center, scale);
  }, [scale, selectedPDFIndex]);

  return (
    <S.PDFViewerContainer>
      {/* 뷰어 컨트롤러 */}
      <ViewerController canvasRefs={canvasRefs} />

      {/* 뷰어 */}
      <S.Viewer>
        <S.CanvasWrapper
          ref={canvasContainerRef}
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <S.Canvas ref={canvasRef} />
        </S.CanvasWrapper>

        <S.FloatingButtonArea isExistActiveStamp={isExistActiveStamp}>
          {isExistActiveStamp && (
            <Button
              label="🗑️"
              onClick={handleStampDelete}
              theme={ButtonTheme.Secondary}
            />
          )}
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
