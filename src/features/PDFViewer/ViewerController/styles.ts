import styled from "@emotion/styled";
import { ellipsis } from "@/assets/styles/mixins.ts";

export const ViewerController = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 24px;
  width: 100%;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.base.white};
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.gray.opacity10};
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  height: 100%;
`;

export const FileName = styled.span`
  flex: 1;
  font-size: 16px;
  font-weight: 700;
  ${ellipsis}
`;

export const ZoomControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ZoomButton = styled.button`
  padding: 4px 8px;
  font-size: 16px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.base.white};
  border: 1px solid ${({ theme }) => theme.colors.gray[100]};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }
`;

export const ZoomLevel = styled.span`
  min-width: 48px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.base.black};
`;
