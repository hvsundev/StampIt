import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  //max-width: 1512px;
  //max-height: 900px;
  box-sizing: border-box;
`;

export const FileUploaderWrapper = styled.div`
  flex: 0 0 280px;
  width: 100%;
  flex-shrink: 0;
  border-right: 1px solid ${({ theme }) => theme.colors.gray};
`;

export const PDFViewerWrapper = styled.div`
  flex: 1;
  width: 100%;
  overflow: hidden;
`;
