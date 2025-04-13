import { useEffect } from "react";
import * as fabric from "fabric";
import { getImagesByFile } from "@/utils/utils.ts";

export const useFabricCanvases = ({
  PDFFile,
  canvasSize,
  canvasRef,
  canvasRefs,
  setPdfPages,
  handleInitialize,
}: {
  PDFFile: File | null;
  canvasSize: { FABRIC_CANVAS_WIDTH: number; FABRIC_CANVAS_HEIGHT: number };
  canvasRef: React.RefObject<HTMLDivElement | null>;
  canvasRefs: React.MutableRefObject<fabric.Canvas[]>;
  setPdfPages: (pages: string[]) => void;
  handleInitialize: () => void;
}) => {
  useEffect(() => {
    if (!PDFFile) {
      canvasRefs.current = [];
      canvasRef.current?.replaceChildren();
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
            const scale = Math.min(
              canvasSize.FABRIC_CANVAS_WIDTH / image.width,
              canvasSize.FABRIC_CANVAS_HEIGHT / image.height,
            );
            const fabricImg = new fabric.Image(image, {
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
  }, [PDFFile, canvasSize]);
};
