import { useEffect, useMemo, useRef, useState } from "react";
import * as fabric from "fabric";

import { getImagesByFile } from "@/utils/utils.ts";
import * as S from "./style.ts";
import Button from "@/components/common/Button/Button.tsx";
import { usePDF } from "@/context/usePDFContext";
import { ButtonTheme } from "@/components/common/Button/interface.ts";
import PDFPreview from "@/features/PDFViewer/PDFPreview";
import ViewerController from "@/features/PDFViewer/ViewerController";

const PDFViewer = () => {
  const {
    PDFFile,
    selectedPDFIndex,
    stamps,
    selectedStampIndex,
    handleInitialize,
  } = usePDF();
  const canvasRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasRefs = useRef<fabric.Canvas[]>([]);

  const [pdfPages, setPdfPages] = useState<string[]>([]);
  const [canvasSize, setCanvasSize] = useState({
    FABRIC_CANVAS_WIDTH: 0,
    FABRIC_CANVAS_HEIGHT: 0,
  });
  const [isExistActiveStamp, setIsExistActiveStamp] = useState(false);

  const mountCanvas = (container: HTMLDivElement, canvas: fabric.Canvas) => {
    container.innerHTML = "";
    container.appendChild(canvas.wrapperEl);
    canvas.requestRenderAll();
  };

  const createDeleteHandler = (canvas: fabric.Canvas) => {
    return (e: KeyboardEvent) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        const activeStamp = canvas.getActiveObject();
        if (activeStamp) {
          canvas.remove(activeStamp);
          canvas.discardActiveObject();
          canvas.requestRenderAll();
          setIsExistActiveStamp(false);
        }
      }
    };
  };

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

  const handleStampDraw = () => {
    const activeCanvas = canvasRefs.current[selectedPDFIndex];
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
  };

  useEffect(() => {
    if (!PDFFile) {
      canvasRefs.current = [];

      if (canvasRef.current) {
        canvasRef.current.innerHTML = "";
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
        rawCanvas.width = canvasSize.FABRIC_CANVAS_WIDTH;
        rawCanvas.height = canvasSize.FABRIC_CANVAS_HEIGHT;

        if (i === 0 && canvasRef.current) {
          canvasRef.current.innerHTML = "";
          canvasRef.current.appendChild(rawCanvas);
        }

        const fabricCanvas = new fabric.Canvas(rawCanvas, {
          selection: true,
        });
        fabricCanvas.defaultCursor = "move";

        const bgImage = await new Promise<fabric.Image>((resolve) => {
          const image = new Image();
          image.crossOrigin = "anonymous";

          image.onload = () => {
            const imgWidth = image.width;
            const imgHeight = image.height;

            const scaleX = canvasSize.FABRIC_CANVAS_WIDTH / imgWidth;
            const scaleY = canvasSize.FABRIC_CANVAS_HEIGHT / imgHeight;
            const scale = Math.min(scaleX, scaleY);

            const fabricImg = new fabric.Image(image, {
              left: 0,
              top: 0,
              scaleX: scale,
              scaleY: scale,
              selectable: false,
              evented: false,
            });

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
    const activeCanvas = canvasRefs.current[selectedPDFIndex];
    const container = canvasRef.current;

    if (!container || !activeCanvas) return;

    mountCanvas(container, activeCanvas);
    const handleKeyDown = createDeleteHandler(activeCanvas);

    const handleSelectionChange = () => {
      const activeObj = activeCanvas.getActiveObject();
      setIsExistActiveStamp(!!activeObj);
    };

    activeCanvas.on("selection:created", handleSelectionChange);
    activeCanvas.on("selection:updated", handleSelectionChange);
    activeCanvas.on("selection:cleared", () => {
      setIsExistActiveStamp(false);
    });

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      activeCanvas.off("selection:created", handleSelectionChange);
      activeCanvas.off("selection:updated", handleSelectionChange);
      activeCanvas.off("selection:cleared");
    };
  }, [selectedPDFIndex]);

  useEffect(() => {
    if (!canvasContainerRef.current) return;

    const height = canvasContainerRef.current.clientHeight;
    const width = height / Math.sqrt(2);

    setCanvasSize({
      FABRIC_CANVAS_WIDTH: parseFloat(width.toFixed(2)),
      FABRIC_CANVAS_HEIGHT: parseFloat(height.toFixed(2)),
    });
  }, []);

  return (
    <S.PDFViewerContainer>
      {/* 뷰어 컨트롤러 */}
      <ViewerController canvasRefs={canvasRefs} />

      {/* 뷰어 */}
      <S.Viewer>
        <S.CanvasWrapper
          ref={canvasContainerRef}
          style={{ height: "100%", width: "100%" }}
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
