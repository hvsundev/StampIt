import * as S from "./style.ts";
import PDFUploader from "@/features/FileUploader/PDFUploader";
import StampUploader from "@/features/FileUploader/StampUploader";
import StampLogo from "@/assets/images/logo.png";

const FileUploader = () => {
  return (
    <S.FileUploaderWrapper>
      {/*<S.FileUploaderHeader>*/}
      {/*  <img src={StampLogo} alt="로고" />*/}
      {/*<h1>전자 도장을 찍어보자!</h1>*/}
      {/*</S.FileUploaderHeader>*/}
      <S.FileUploaderContent>
        {/* PDF 업로드 */}
        <S.FileUploaderSection>
          <PDFUploader />
        </S.FileUploaderSection>

        {/* 도장 이미지 업로드 */}
        <S.FileUploaderSection>
          <StampUploader />
        </S.FileUploaderSection>
      </S.FileUploaderContent>
    </S.FileUploaderWrapper>
  );
};

export default FileUploader;
