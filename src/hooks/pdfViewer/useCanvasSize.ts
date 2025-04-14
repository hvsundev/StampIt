import { useEffect } from "react";
import { usePDFFileManager } from "@/context/usePDFFileManager";
import { getImagesByFile } from "@/utils/utils";

export const useCanvasSize = () => {
  const { PDFFile, setCanvasSize } = usePDFFileManager();

  useEffect(() => {
    if (!PDFFile) return;

    const loadImageSize = async () => {
      const images = await getImagesByFile(PDFFile);
      if (!images || images.length === 0) return;

      const img = new Image();
      img.src = images[0];

      img.onload = () => {
        setCanvasSize({
          FABRIC_CANVAS_WIDTH: img.width,
          FABRIC_CANVAS_HEIGHT: img.height,
        });
      };
    };

    loadImageSize();
  }, [PDFFile, setCanvasSize]);
};
