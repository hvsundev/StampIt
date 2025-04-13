import * as S from "./style.ts";
import PDFUploader from "@/features/FileUploader/PDFUploader";
import StampUploader from "@/features/FileUploader/StampUploader";

const FileUploader = () => {
  return (
    <S.FileUploaderWrapper>
      <S.FileUploaderTop>
        {/* PDF 업로드 */}
        <S.FileUploaderSection>
          <PDFUploader />
        </S.FileUploaderSection>

        {/* 도장 업로드 */}
        <S.FileUploaderSection>
          <StampUploader />
        </S.FileUploaderSection>
      </S.FileUploaderTop>
    </S.FileUploaderWrapper>
  );
};

export default FileUploader;
