import * as S from "./styles.ts";
import { usePDF } from "@/context/usePDFContext";
import Button from "@/components/common/Button/Button.tsx";
import { PDFDocument } from "pdf-lib";
import * as fabric from "fabric";
import downloadIcon from "@/assets/images/download.svg";
import { ButtonSize } from "@/components/common/Button/interface.ts";

interface ViewerControllerProps {
  canvasRefs: React.MutableRefObject<fabric.Canvas[]>;
}

const ViewerController = ({ canvasRefs }: ViewerControllerProps) => {
  const { PDFFile } = usePDF();

  const handlePDFDownload = async () => {
    const doc = await PDFDocument.create();

    for (const canvas of canvasRefs.current) {
      const dataUrl = canvas.toDataURL();
      const png = await fetch(dataUrl).then((res) => res.arrayBuffer());
      const img = await doc.embedPng(png);
      const page = doc.addPage([img.width, img.height]);
      page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    }

    const pdfBytes = await doc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "stamped.pdf";
    link.click();
  };

  return (
    <S.ViewerController>
      <S.FileName>{PDFFile?.name}</S.FileName>
      <Button
        label="PDF 다운로드"
        size={ButtonSize.Large}
        onClick={handlePDFDownload}
        rounded={false}
        leftIcon={downloadIcon}
      />
    </S.ViewerController>
  );
};

export default ViewerController;
