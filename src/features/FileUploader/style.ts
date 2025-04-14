import styled from "@emotion/styled";

export const FileUploaderWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const FileUploaderSection = styled.div`
  padding: 24px 30px;
`;

export const FileUploaderContent = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Uploader = styled.div``;

export const UploadHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
`;

export const UploadContent = styled.div`
  display: flex;
  flex-flow: wrap;
  flex-direction: column;
  gap: 8px;
`;
