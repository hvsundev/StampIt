import * as S from "./style.ts";
import PDFUploader from "@/features/FileUploader/PDFUploader";
import StampUploader from "@/features/FileUploader/StampUploader";

const FileUploader = () => {
  return (
    <S.FileUploaderWrapper>
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
