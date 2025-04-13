import { useEffect, useState, RefObject } from "react";

export const useCanvasSize = (
  containerRef: RefObject<HTMLDivElement | null>,
) => {
  const [canvasSize, setCanvasSize] = useState({
    FABRIC_CANVAS_WIDTH: 0,
    FABRIC_CANVAS_HEIGHT: 0,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const height = containerRef.current.clientHeight;
    const width = height / Math.sqrt(2); // A4 비율

    setCanvasSize({
      FABRIC_CANVAS_WIDTH: parseFloat(width.toFixed(2)),
      FABRIC_CANVAS_HEIGHT: parseFloat(height.toFixed(2)),
    });
  }, [containerRef]);

  return canvasSize;
};
