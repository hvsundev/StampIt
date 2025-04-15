import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray};
  padding: 36px;
  box-sizing: border-box;
`;

export const FileUploaderWrapper = styled.div`
  flex: 0 0 300px;
  width: 100%;
  flex-shrink: 0;
  border-right: 1px solid ${({ theme }) => theme.colors.gray};
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  overflow: hidden;
`;

export const PDFViewerWrapper = styled.div`
  flex: 1;
  width: 100%;
  overflow: hidden;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;
