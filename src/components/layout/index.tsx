import { ReactNode } from "react";
import * as S from "@/components/layout/styles.tsx";

type LayoutProps = {
  children: {
    fileUploader: ReactNode;
    PDFViewer: ReactNode;
  };
};

const Layout = ({ children }: LayoutProps) => {
  const { fileUploader, PDFViewer } = children;

  return (
    <S.Container>
      <S.FileUploaderWrapper>{fileUploader}</S.FileUploaderWrapper>
      <S.PDFViewerWrapper>{PDFViewer}</S.PDFViewerWrapper>
    </S.Container>
  );
};

export default Layout;
