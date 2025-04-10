import * as S from "./style.ts";
import Button from "@/components/common/Button/Button.tsx";
import PDFUploader from "@/features/FileUploader/PDFUploader";
import StampUploader from "@/features/FileUploader/StampUploader";

const FileUploader = () => {
  const handleStampDraw = async () => {
    // 도장 찍기 로직
  };

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

      {/* 도장 찍기 */}
      <S.FileUploaderBottom>
        <Button label={"도장 찍기"} onClick={handleStampDraw} />
      </S.FileUploaderBottom>
    </S.FileUploaderWrapper>
  );
};

export default FileUploader;
