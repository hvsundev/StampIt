import { useEffect, useState } from "react";
import * as S from "./styles.ts";
import { getImagesByFile } from "@/utils/utils.ts";
import { usePDF } from "@/context/usePDFContext";

const PDFPreview = () => {
  const { PDFFile, selectedPDFIndex, setSelectedPDFIndex } = usePDF();
  const [fileImages, setFileImages] = useState<string[] | null>(null);

  useEffect(() => {
    if (!PDFFile) return;

    (async () => {
      const image = await getImagesByFile(PDFFile);
      setFileImages(image ?? []);
    })();
  }, [PDFFile]);

  return (
    <S.Wrapper>
      {fileImages?.map((image, index) => (
        <S.PreviewInfo>
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
