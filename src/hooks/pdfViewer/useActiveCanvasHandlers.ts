import { useEffect } from "react";
import * as fabric from "fabric";

export const useActiveCanvasHandlers = ({
  selectedPDFIndex,
  canvasRefs,
  setIsExistActiveStamp,
}: {
  selectedPDFIndex: number;
  canvasRefs: React.MutableRefObject<fabric.Canvas[]>;
  setIsExistActiveStamp: (val: boolean) => void;
}) => {
  useEffect(() => {
    const activeCanvas = canvasRefs.current[selectedPDFIndex];
    if (!activeCanvas) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (["Delete", "Backspace"].includes(e.key)) {
        const obj = activeCanvas.getActiveObject();
        if (obj) {
          activeCanvas.remove(obj);
          activeCanvas.discardActiveObject();
          activeCanvas.requestRenderAll();
          setIsExistActiveStamp(false);
        }
      }
    };

    const updateSelection = () => {
      setIsExistActiveStamp(!!activeCanvas.getActiveObject());
    };

    const limitObjectMove = (e: any) => {
      const obj = e.target;
      if (!obj) return;

      const width = activeCanvas.getWidth();
      const height = activeCanvas.getHeight();
      const objWidth = obj.getScaledWidth();
      const objHeight = obj.getScaledHeight();

      obj.left = Math.max(0, Math.min(obj.left!, width - objWidth));
      obj.top = Math.max(0, Math.min(obj.top!, height - objHeight));
    };

    document.addEventListener("keydown", handleKeyDown);
    activeCanvas.on("selection:created", updateSelection);
    activeCanvas.on("selection:updated", updateSelection);
    activeCanvas.on("selection:cleared", () => setIsExistActiveStamp(false));
    activeCanvas.on("object:moving", limitObjectMove);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      activeCanvas.off("selection:created", updateSelection);
      activeCanvas.off("selection:updated", updateSelection);
      activeCanvas.off("selection:cleared");
      activeCanvas.off("object:moving", limitObjectMove);
    };
  }, [selectedPDFIndex, canvasRefs.current.length]);
};
