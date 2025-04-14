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
  z-index: 1;
`;

export const FloatingButtonArea = styled.div<{ isExistActiveStamp: boolean }>`
  position: absolute;
  display: flex;
  justify-content: center;
  left: 0;
  right: 0;
  gap: 10px;
  bottom: 30px;

  opacity: ${({ isExistActiveStamp }) => (isExistActiveStamp ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

export const PageController = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 0 24px;
  width: 100%;
  font-size: 14px;
`;

export const MoveButton = styled.button`
  background: none;
  border: 1px solid #ccc;
  width: 40px;
  height: 40px;
  padding: 4px 12px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.black};
  background-color: rgba(240, 240, 240, 0.8);

  &:hover:enabled {
    background-color: ${({ theme }) => theme.colors.white};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
  z-index: 10;
`;
