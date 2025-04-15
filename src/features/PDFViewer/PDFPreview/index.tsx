import { useEffect, useState } from "react";
import * as S from "./styles.ts";
import { getImagesByFile } from "@/utils/utils.ts";
import { usePDFFileManager } from "@/context/usePDFFileManager";

const PDFPreview = () => {
  const { PDFFile, selectedPDFIndex, setSelectedPDFIndex } =
    usePDFFileManager();
  const [fileImages, setFileImages] = useState<string[] | null>(null);

  useEffect(() => {
    if (!PDFFile) {
      setFileImages(null);
      return;
    }

    (async () => {
      const image = await getImagesByFile(PDFFile);
      setFileImages(image ?? []);
    })();
  }, [PDFFile]);

  return (
    <S.Wrapper>
      {fileImages?.map((image, index) => (
        <S.PreviewInfo key={index}>
          <S.ImageWrapper
            onClick={() => setSelectedPDFIndex(index)}
            isSelected={selectedPDFIndex === index}
          >
            <S.PreviewImage src={image} />
          </S.ImageWrapper>
          <S.ImageIndex>{index + 1}</S.ImageIndex>
        </S.PreviewInfo>
      ))}
    </S.Wrapper>
  );
};

export default PDFPreview;
