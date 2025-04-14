import styled from "@emotion/styled";
import { disableUserDrag } from "@/assets/styles/mixins.ts";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
  overflow-x: scroll;
  padding: 0 24px;
  gap: 20px;
`;
export const PreviewInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-weight: 700;
`;

export const ImageWrapper = styled.div<{
  isSelected: boolean;
}>`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  width: 60px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.3s ease;

  border: 2px solid;
  border-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.primary : theme.colors.gray};
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: auto;
  ${disableUserDrag}
`;

export const ImageIndex = styled.div`
  display: flex;
  justify-content: center;
  font-size: 12px;
`;
