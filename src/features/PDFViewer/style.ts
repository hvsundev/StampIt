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
  background-color: ${({ theme }) => theme.colors.gray[400]};
`;

export const Preview = styled.div`
  width: 100%;
  height: 20%;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
  background-color: ${({ theme }) => theme.colors.base.white};
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

export const StampActionBar = styled.div<{ isExistActiveStamp: boolean }>`
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

export const PageNavControls = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 0 30px;
  width: 100%;
  font-size: 14px;
  pointer-events: none;
`;

export const MoveButton = styled.button`
  width: 40px;
  height: 40px;
  padding: 4px 12px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.base.black};
  transition: 0.1s;
  background-color: ${({ theme }) => theme.colors.gray.opacity30};
  pointer-events: auto;
  opacity: 0.6;

  &:hover:enabled {
    opacity: 1;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const CanvasLoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
  z-index: 10;

  span {
    color: ${({ theme }) => theme.colors.base.black};
    letter-spacing: -0.3px;
  }
`;
