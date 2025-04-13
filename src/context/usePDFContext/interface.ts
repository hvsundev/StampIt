export interface PDFContextType {
  PDFFile: File | null;
  setPDFFile: (file: File | null) => void;
  stampedPDFUrl: string | null;
  setStampedPDFUrl: (url: string | null) => void;

  stamps: string[];
  addStamp: (stamp: string) => void;
  resetStamps: () => void;

  selectedStampIndex: number;
  setSelectedStampIndex: (index: number) => void;
  selectedPDFIndex: number;
  setSelectedPDFIndex: (index: number) => void;
  handleInitialize: () => void;
}
