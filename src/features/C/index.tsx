import { useEffect, useState } from "react";
import { useStore } from "@/store/store.ts";

import "./C.css";
import { getImageByFile } from "@/utils/utils.ts";
import { usePDF } from "@/context/usePDFContext";

const C = () => {
  const { PDFFile } = usePDF();
  const [fileImage, setFileImage] = useState<string | null>(null);

  useEffect(() => {
    if (!PDFFile) return;

    (async () => {
      setFileImage((await getImageByFile(PDFFile)) ?? "");
    })();
  }, [PDFFile]);

  return (
    <div className="C">
      <div className="top">
        {fileImage && (
          <div>
            <div className="image">
              <img src={fileImage} />
            </div>
            <div className="imageIndex">1</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default C;
