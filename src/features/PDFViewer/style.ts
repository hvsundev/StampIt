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

export const ViewerController = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 24px;
  width: 100%;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.white};

  span {
    font-size: 16px;
  }
`;

export const Preview = styled.div`
  width: 100%;
  height: 20%;
  border-top: 1px solid ${({ theme }) => theme.colors.gray};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const CanvasWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const Canvas = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const FloatingButtonArea = styled.div`
  position: absolute;
  display: flex;
  gap: 10px;
  right: 20px;
  bottom: 20px;
`;
