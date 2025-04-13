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
  display: flex;
  position: relative;
  width: 100%;
  height: calc(80% - 48px);
  background-color: ${({ theme }) => theme.colors.deepGray};
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
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
`;

export const Canvas = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const FloatingButtonArea = styled.div<{ isExistActiveStamp: boolean }>`
  position: absolute;
  display: flex;
  justify-content: center;
  left: 0;
  right: 0;
  gap: 10px;
  bottom: 20px;

  opacity: ${({ isExistActiveStamp }) => (isExistActiveStamp ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;
