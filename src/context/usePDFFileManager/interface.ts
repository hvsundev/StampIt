import React from "react";

export interface PDFContextType {
  PDFFile: File | null;
  setPDFFile: (file: File | null) => void;

  stamps: string[];
  addStamp: (stamp: string) => void;
  deleteStamp: (index: number) => void;

  selectedStampIndex: number;
  setSelectedStampIndex: (index: number) => void;

  selectedPDFIndex: number;
  setSelectedPDFIndex: React.Dispatch<React.SetStateAction<number>>;

  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;

  handleInitialize: () => void;

  canvasSize: {
    FABRIC_CANVAS_WIDTH: number;
    FABRIC_CANVAS_HEIGHT: number;
  };
  setCanvasSize: React.Dispatch<
    React.SetStateAction<{
      FABRIC_CANVAS_WIDTH: number;
      FABRIC_CANVAS_HEIGHT: number;
    }>
  >;

  isDownloading: boolean;
  setIsDownloading: React.Dispatch<React.SetStateAction<boolean>>;
}
