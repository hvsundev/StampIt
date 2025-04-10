import styled from "@emotion/styled";

export const PDFViewerWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 280px;
  height: 100%;
`;

export const CanvasWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;

  canvas {
    width: 100%;
    height: 100%;
  }
`;
