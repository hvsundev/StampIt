import styled from "@emotion/styled";

export const PDFViewerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 0 0 280px;
  height: 100%;
`;

export const Viewer = styled.div`
  position: relative;
  width: 100%;
  height: 80%;
  background-color: ${({ theme }) => theme.colors.gray};
`;

export const Preview = styled.div`
  width: 100%;
  height: 20%;
  border-top: 1px solid ${({ theme }) => theme.colors.gray};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const CanvasWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const Canvas = styled.div`
  width: 100%;
  height: 100%;
`;

export const FloatingButtonArea = styled.div`
  position: absolute;
  display: flex;
  gap: 10px;
  right: 20px;
  bottom: 20px;
`;
