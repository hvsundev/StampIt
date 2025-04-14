import { useEffect } from "react";
import * as fabric from "fabric";

export const useStampInserter = ({
  selectedStampIndex,
  setSelectedStampIndex,
  stamps,
  canvasRefs,
  selectedPDFIndex,
  setIsExistActiveStamp,
}: {
  selectedStampIndex: number;
  setSelectedStampIndex: (index: number) => void;
  stamps: string[];
  canvasRefs: React.MutableRefObject<fabric.Canvas[]>;
  selectedPDFIndex: number;
  setIsExistActiveStamp?: (val: boolean) => void;
}) => {
  useEffect(() => {
    if (selectedStampIndex === -1 || !stamps[selectedStampIndex]) return;

    const canvas = canvasRefs.current[selectedPDFIndex];
    if (!canvas) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const stamp = new fabric.Image(img, {
        left: 150,
        top: 150,
        scaleX: 0.3,
        scaleY: 0.3,
      });
      canvas.add(stamp);
      canvas.setActiveObject(stamp);
      canvas.requestRenderAll();

      if (setIsExistActiveStamp) {
        setIsExistActiveStamp(true);
      }

      setSelectedStampIndex(-1);
    };
    img.src = stamps[selectedStampIndex];
  }, [selectedStampIndex]);
};
