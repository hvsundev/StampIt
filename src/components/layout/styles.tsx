import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  gap: 16px;
  padding: 16px;
  box-sizing: border-box;

  min-width: 1512px;
  max-width: 1512px;
  min-height: 752px;
  max-height: 752px;
`;

export const FileUploaderWrapper = styled.div`
  flex: 0 0 280px;
  width: 100%;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const PDFViewerWrapper = styled.div`
  flex: 0 0 962px;
  width: 100%;
  flex: 1;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const CWrapper = styled.div`
  flex: 0 0 250px;
  width: 100%;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.white};
`;
