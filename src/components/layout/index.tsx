import { ReactNode } from "react";
import * as S from "@/components/layout/styles.tsx";

interface LayoutProps {
  children: {
    fileUploader: ReactNode;
    PDFViewer: ReactNode;
    PDFPreview: ReactNode;
  };
}

const Layout = ({ children }: LayoutProps) => {
  const { fileUploader, PDFViewer, PDFPreview } = children;

  return (
    <S.Container>
      <S.FileUploaderWrapper>{fileUploader}</S.FileUploaderWrapper>
      <S.PDFViewerWrapper>{PDFViewer}</S.PDFViewerWrapper>
      <S.PDFPreviewWrapper>{PDFPreview}</S.PDFPreviewWrapper>
    </S.Container>
  );
};

export default Layout;
