import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { ellipsis } from "@/assets/styles/mixins.ts";

export const DropArea = styled.div<{
  isExistFile: boolean;
  isDragging?: boolean;
}>`
  width: 100%;
  height: 80px;
  position: relative;
  padding: 0 16px;
  border: 1px dashed #ccc;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  transition:
    border-color 0.2s,
    background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  letter-spacing: -0.3px;

  ${({ isDragging }) =>
    isDragging &&
    `
    background-color: #f0f8ff;
    border-color: #1d5aff;
  `}

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: #f0f8ff;
  }

  ${({ isExistFile, theme }) =>
    isExistFile &&
    css`
      border-style: solid;
      font-size: 16px;
      font-weight: 500;
      padding: 0 24px;
      justify-content: space-between;

      &:hover {
        border-color: ${theme.colors.primary};
        background-color: ${theme.opacityColors.primary_20};
        color: ${theme.colors.black};

        &::after {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          top: -5px;
          right: -5px;
          content: "";
          background-image: url("src/assets/images/delete.svg");
          width: 20px;
          height: 20px;
          color: #fff;
          border-radius: 50%;
        }
      }
    `}
`;

export const File = styled.div`
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  transition: 0.2s;
  border-radius: 10px;

  span {
    ${ellipsis}
  }
`;
