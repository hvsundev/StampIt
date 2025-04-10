import { createContext } from "react";
import { PDFContextType } from "@/context/usePDFContext/interface.ts";

const PDFContext = createContext<PDFContextType | undefined>(undefined);

export default PDFContext;
