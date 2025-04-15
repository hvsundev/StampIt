import { useEffect } from "react";
import { usePDFFileManager } from "@/context/usePDFFileManager";
import { getImagesByFile } from "@/utils/utils";
import { useDialog } from "@/context/useDialog";

export const useCanvasSize = () => {
  const { PDFFile, setCanvasSize } = usePDFFileManager();
  const { showToast } = useDialog();

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
      img.onerror = () => {
        showToast({
          type: "warning",
          message: "미리보기 로딩에 실패했어요",
        });
      };
    };

    loadImageSize();
  }, [PDFFile, setCanvasSize]);
};
