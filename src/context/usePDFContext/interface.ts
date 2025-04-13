import React from "react";

export interface PDFContextType {
  PDFFile: File | null;
  setPDFFile: (file: File | null) => void;

  stamps: string[];
  addStamp: (stamp: string) => void;
  resetStamps: () => void;

  selectedStampIndex: number;
  setSelectedStampIndex: (index: number) => void;

  selectedPDFIndex: number;
  setSelectedPDFIndex: (index: number) => void;

  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;

  handleInitialize: () => void;
}
