import { useEffect, useState } from "react";

import "./C.css";
import { getImagesByFile } from "@/utils/utils.ts";
import { usePDF } from "@/context/usePDFContext";

const PDFPreview = () => {
  const { PDFFile } = usePDF();
  const [fileImages, setFileImages] = useState<string[] | null>(null);

  useEffect(() => {
    if (!PDFFile) return;

    (async () => {
      setFileImages((await getImagesByFile(PDFFile)) ?? "");
    })();
  }, [PDFFile]);

  return (
    <div className="C">
      <div className="top">
        {fileImages?.map((img, index) => (
          <div key={index}>
            <div className="image">
              <img src={img} />
            </div>
            <div className="imageIndex">{index + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PDFPreview;
