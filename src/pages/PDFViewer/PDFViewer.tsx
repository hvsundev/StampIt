import { useEffect, useRef } from "react";
import { useStore } from "@/store/store.ts";

import * as fabric from "fabric";

import { getImageByFile } from "@/utils/utils.ts";
import { Wrapper, CanvasWrapper } from "./PDFViewer.styles.ts";
import Button from "@/components/Button/Button.tsx";

const FABRIC_CANVAS_WIDTH = 500;
const FABRIC_CANVAS_HEIGHT = parseFloat(
  (FABRIC_CANVAS_WIDTH * Math.sqrt(2)).toFixed(2),
);

const B = () => {
  const { file } = useStore();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  const handlePDFDownload = async () => {
    // TODO: implement download logic
  };

  useEffect(() => {
    if (!file || !canvasRef.current) return;

    fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
      width: FABRIC_CANVAS_WIDTH,
      height: FABRIC_CANVAS_HEIGHT,
      selection: false,
    });

    (async () => {
      const image = await getImageByFile(file);

      const img = await fabric.FabricImage.fromURL(image!);

      img.set({
        objectCaching: false,
      });

      fabricCanvasRef.current!.backgroundImage = img;
      fabricCanvasRef.current?.requestRenderAll();
    })();
  }, [file]);

  return (
    <Wrapper>
      <CanvasWrapper>
        <canvas ref={canvasRef} />
        <Button label="PDF 다운로드" onClick={handlePDFDownload} />
      </CanvasWrapper>
    </Wrapper>
  );
};

export default B;
