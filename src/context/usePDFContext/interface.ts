export interface Stamp {
  id: string;
  image: string;
  x: number;
  y: number;
}

export interface PDFContextType {
  PDFFile: File | null;
  setPDFFile: (file: File | null) => void;
  stampedPDFUrl: string | null;
  setStampedPDFUrl: (url: string | null) => void;

  stamps: Stamp[];
  addStamp: (stamp: Stamp) => void;
  resetStamps: () => void;

  selectedStampImage: string | null;
  setSelectedStampImage: (img: string | null) => void;
}
