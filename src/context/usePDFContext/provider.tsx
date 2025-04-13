import React, { useEffect, useState } from "react";
import PDFContext from "@/context/usePDFContext/context.ts";

export const PDFProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [PDFFile, setPDFFile] = useState<File | null>(null);
  const [stampedPDFUrl, setStampedPDFUrl] = useState<string | null>(null);

  const [stamps, setStamps] = useState<string[]>([]);
  const [selectedStampIndex, setSelectedStampIndex] = useState<number>(-1);
  const [selectedPDFIndex, setSelectedPDFIndex] = useState<number>(0);

  const addStamp = (stamp: string) => {
    if (!stamp) return;

    if (stamps.length < 5) {
      setStamps((prev) => [...prev, stamp]);
    } else {
      alert("최대 5개까지 업로드 할 수 있어요");
    }
  };

  const resetStamps = () => {
    setStamps([]);
  };

  return (
    <PDFContext.Provider
      value={{
        PDFFile,
        setPDFFile,
        stampedPDFUrl,
        setStampedPDFUrl,
        stamps,
        addStamp,
        resetStamps,
        selectedStampIndex,
        setSelectedStampIndex,
        selectedPDFIndex,
        setSelectedPDFIndex,
      }}
    >
      {children}
    </PDFContext.Provider>
  );
};
