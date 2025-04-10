import styled from "@emotion/styled";

export const PDFViewerWrapper = styled.div`
  position: relative;
  display: flex;
  flex: 0 0 280px;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const CanvasWrapper = styled.div`
  width: 100%;
  height: 100%;

  canvas {
    width: 100%;
    height: 100%;
  }
`;
