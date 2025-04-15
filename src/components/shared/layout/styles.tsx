import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray[100]};
  padding: 36px;
  box-sizing: border-box;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  box-shadow: 0px 4px 20px ${({ theme }) => theme.colors.gray.opacity10};
  border-radius: 10px;
  overflow: hidden;
`;

export const FileUploaderWrapper = styled.div`
  width: 300px;
  flex-shrink: 0;
  border-right: 1px solid ${({ theme }) => theme.colors.gray[100]};
`;

export const PDFViewerWrapper = styled.div`
  flex: 1;
  width: 100%;
  overflow: hidden;
`;
