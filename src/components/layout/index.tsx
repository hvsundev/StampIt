import { ReactNode } from "react";
import * as S from "@/components/layout/styles.tsx";

type LayoutProps = {
  children: {
    fileUploader: ReactNode;
    pdfViewer: ReactNode;
    c: ReactNode;
  };
};

const Layout = ({ children }: LayoutProps) => {
  const { fileUploader, pdfViewer, c } = children;

  return (
    <S.Container>
      <S.FileUploaderWrapper>{fileUploader}</S.FileUploaderWrapper>
      <S.PDFViewerWrapper>{pdfViewer}</S.PDFViewerWrapper>
      <S.CWrapper>{c}</S.CWrapper>
    </S.Container>
  );
};

export default Layout;
