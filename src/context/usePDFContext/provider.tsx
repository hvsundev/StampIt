import React, { useEffect, useState } from "react";
import PDFContext from "@/context/usePDFContext/context.ts";
import { Stamp } from "@/context/usePDFContext/interface.ts";

export const PDFProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [PDFFile, setPDFFile] = useState<File | null>(null);
  const [stampedPDFUrl, setStampedPDFUrl] = useState<string | null>(null);

  const [stamps, setStamps] = useState<Stamp[]>([]);
  const [selectedStampImage, setSelectedStampImage] = useState<string | null>(
    null,
  );

  const addStamp = (stamp: Stamp) => {
    if (!stamp) return;
    if (stamps.length < 5) {
      setStamps((prev) => [...prev, stamp]);
    } else {
      alert("최대 5개까지만 업로드할 수 있습니다.");
    }
  };

  const resetStamps = () => {
    setStamps([]);
  };

  useEffect(() => {
    console.log(PDFFile);
  }, [PDFFile]);

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
        selectedStampImage,
        setSelectedStampImage,
      }}
    >
      {children}
    </PDFContext.Provider>
  );
};
