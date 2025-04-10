import { useRef } from "react";
import { useStore } from "@/store/store.ts";

import {
  Wrapper,
  Section,
  Top,
  PdfUpload,
  PdfFile,
  StampUpload,
  Stamps,
  Bottom,
  RemoveButton,
} from "./FileUploader.styled.ts";

import Stamp1 from "@/assets/images/stamp-1.jpg";
import Button from "@/components/Button/Button.tsx";

const FileUploader = () => {
  const { file, setFile } = useStore();

  const stampInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const handlePDFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFile(file!);
    e.target.value = "";
  };

  const handleStampUpload = () => {
    stampInputRef.current?.click();
  };

  const handlePDFUpload = () => {
    pdfInputRef.current?.click();
  };

  const handlePDFRemove = () => {
    setFile(null);
  };

  const handleStampDraw = async () => {
    // 도장 찍기 로직
  };

  return (
    <Wrapper>
      <Top>
        <Section>
          <PdfUpload>
            <input
              ref={pdfInputRef}
              type="file"
              onChange={handlePDFChange}
              style={{ display: "none" }}
            />
            <Button label={"PDF 업로드"} onClick={handlePDFUpload} />
          </PdfUpload>

          <PdfFile>
            {!!file?.name && (
              <>
                📄 파일명: <strong>{file?.name}</strong>
                <RemoveButton>
                  <Button label={"X"} onClick={handlePDFRemove} />
                </RemoveButton>
              </>
            )}
          </PdfFile>
        </Section>

        <Section>
          <StampUpload>
            <input
              ref={stampInputRef}
              type="file"
              accept=".png"
              onChange={() => {}}
              style={{ display: "none" }}
            />
            <Button label={"도장 업로드"} onClick={handleStampUpload} />
          </StampUpload>

          <Stamps>
            <img src={Stamp1} />
          </Stamps>
        </Section>
      </Top>

      <Bottom>
        <Button label={"도장 찍기"} onClick={handleStampDraw} />
      </Bottom>
    </Wrapper>
  );
};

export default FileUploader;
