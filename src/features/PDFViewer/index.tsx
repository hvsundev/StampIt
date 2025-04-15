import { useCallback, useEffect, useRef, useState } from "react";
import * as fabric from "fabric";

import * as S from "./style.ts";
import Button from "@/components/shared/Button";
import { usePDFFileManager } from "@/context/usePDFFileManager";
import { ButtonTheme } from "@/components/shared/Button/interface.ts";
import PDFPreview from "@/features/PDFViewer/PDFPreview";
import ViewerController from "@/features/PDFViewer/ViewerController";
import { useStampInserter } from "@/hooks/PDFViewer/useStampInserter.ts";
import { useActiveCanvasHandlers } from "@/hooks/PDFViewer/useActiveCanvasHandlers.ts";
import { useFabricCanvases } from "@/hooks/PDFViewer/useFabricCanvases.ts";
import { useCanvasSize } from "@/hooks/PDFViewer/useCanvasSize.ts";
import BinIcon from "@/assets/images/bin.svg";

const PDFViewer = () => {
  useCanvasSize();

  const {
    PDFFile,
    stamps,
    selectedPDFIndex,
    setSelectedPDFIndex,
    selectedStampIndex,
    setSelectedStampIndex,
    handleInitialize,
    canvasSize,
    scale,
  } = usePDFFileManager();

  const canvasRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasRefs = useRef<fabric.Canvas[]>([]);

  const [pdfPages, setPdfPages] = useState<string[]>([]);
  const [isExistActiveStamp, setIsExistActiveStamp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useFabricCanvases({
    PDFFile,
    canvasSize,
    canvasRef,
    canvasRefs,
    setPdfPages,
    handleInitialize,
    onStart: () => setIsLoading(true),
    onComplete: () => setIsLoading(false),
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
    setIsExistActiveStamp,
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

  const handlePrevPage = () => {
    setSelectedPDFIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setSelectedPDFIndex((prev) => Math.min(prev + 1, pdfPages.length - 1));
  };

  return (
    <S.PDFViewerContainer>
      <ViewerController canvasRefs={canvasRefs} />

      <S.Viewer>
        <S.CanvasWrapper ref={canvasContainerRef}>
          <S.Canvas ref={canvasRef} />
          {isLoading && (
            <S.CanvasLoadingOverlay>PDF 로딩 중...</S.CanvasLoadingOverlay>
          )}
        </S.CanvasWrapper>

        {PDFFile && (
          <S.PageNavControls>
            <S.MoveButton
              onClick={handlePrevPage}
              disabled={selectedPDFIndex <= 0}
            >
              &lt;
            </S.MoveButton>
            <S.MoveButton
              onClick={handleNextPage}
              disabled={selectedPDFIndex >= pdfPages.length - 1}
            >
              &gt;
            </S.MoveButton>
          </S.PageNavControls>
        )}

        <S.StampActionBar isExistActiveStamp={!!PDFFile && isExistActiveStamp}>
          {isExistActiveStamp && (
            <Button
              label={"삭제"}
              onClick={handleStampDelete}
              leftIcon={{ src: BinIcon, alt: "삭제 아이콘" }}
              theme={ButtonTheme.Secondary}
            />
          )}
        </S.StampActionBar>
      </S.Viewer>

      <S.Preview>
        <PDFPreview />
      </S.Preview>
    </S.PDFViewerContainer>
  );
};

export default PDFViewer;
