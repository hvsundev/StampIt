import { useEffect } from "react";
import * as fabric from "fabric";
import { getImagesByFile } from "@/utils/utils.ts";
import { usePDFFileManager } from "@/context/usePDFFileManager";

export const useFabricCanvases = ({
  PDFFile,
  canvasSize,
  canvasRef,
  canvasRefs,
  setPdfPages,
  handleInitialize,
  onStart,
  onComplete,
}: {
  PDFFile: File | null;
  canvasSize: { FABRIC_CANVAS_WIDTH: number; FABRIC_CANVAS_HEIGHT: number };
  canvasRef: React.RefObject<HTMLDivElement | null>;
  canvasRefs: React.MutableRefObject<fabric.Canvas[]>;
  setPdfPages: (pages: string[]) => void;
  handleInitialize: () => void;
  onStart?: () => void;
  onComplete?: () => void;
}) => {
  const { scale } = usePDFFileManager();

  useEffect(() => {
    if (!PDFFile) {
      canvasRefs.current = [];
      canvasRef.current?.replaceChildren();
      handleInitialize();
      return;
    }

    // 캔버스 그리기
    (async () => {
      onStart?.();

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

        // 배경 이미지 생성 후 캔버스에 부착
        const bgImage = await new Promise<fabric.Image>((resolve) => {
          const image = new Image();
          image.crossOrigin = "anonymous";
          image.onload = () => {
            const scaleFactor = Math.min(
              canvasSize.FABRIC_CANVAS_WIDTH / image.width,
              canvasSize.FABRIC_CANVAS_HEIGHT / image.height,
            );
            const fabricImg = new fabric.Image(image, {
              scaleX: scaleFactor,
              scaleY: scaleFactor,
              selectable: false,
              evented: false,
            });
            resolve(fabricImg);
          };
          image.src = images[i];
        });

        fabricCanvas.backgroundImage = bgImage;
        fabricCanvas.renderAll();

        // zoom point 생성
        const center = new fabric.Point(
          fabricCanvas.getWidth() / 2,
          fabricCanvas.getHeight() / 2,
        );
        fabricCanvas.zoomToPoint(center, scale);

        newCanvases.push(fabricCanvas);
      }

      canvasRefs.current = newCanvases;

      onComplete?.();
    })();
  }, [PDFFile, canvasSize]);
};
