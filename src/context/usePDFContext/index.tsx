import { useContext } from "react";
import { PDFContextType } from "@/context/usePDFContext/interface.ts";
import PDFContext from "@/context/usePDFContext/context.ts";

export const usePDF = (): PDFContextType => {
  const usePDFContext = useContext(PDFContext);

  if (!usePDFContext) {
    throw new Error("usePDFContext must be used within a PDFProvider");
  }

  return usePDFContext;
};
