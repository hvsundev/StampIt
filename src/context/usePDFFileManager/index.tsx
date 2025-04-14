import { useContext } from "react";
import { PDFContextType } from "@/context/usePDFFileManager/interface.ts";
import PDFContext from "@/context/usePDFFileManager/context.ts";

export const usePDFFileManager = (): PDFContextType => {
  const usePDFContext = useContext(PDFContext);

  if (!usePDFContext) {
    throw new Error("usePDFContext must be used within a PDFProvider");
  }

  return usePDFContext;
};
