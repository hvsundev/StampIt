import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { disableUserDrag } from "@/assets/styles/mixins.ts";

export const FileUploaderWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const FileUploaderSection = styled.div`
  padding: 24px 30px;
`;

export const FileUploaderContent = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Uploader = styled.div``;

export const UploadHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
`;

export const UploadContent = styled.div`
  display: flex;
  flex-flow: wrap;
  flex-direction: column;
  gap: 8px;
`;

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

        &::after {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          top: -5px;
          right: -2px;
          content: "X";
          background-color: black;
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
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
  }
`;

export const UploadTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const Title = styled.p`
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.3px;
`;

export const StepNumbering = styled.span`
  display: flex;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: white;
  background-color: #000000a3;
  border-radius: 50%;
  width: 20px;
  height: 20px;
`;

export const Stamps = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  min-height: 54px;
`;

export const Description = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.deepGray};
`;
export const Count = styled.span`
  font-size: 14px;
  display: flex;
  justify-content: flex-end;

  span {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StampImage = styled.div<{
  isEmpty: boolean;
}>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc((100% - 16px) / 3);
  aspect-ratio: 1;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.paleGray};
  overflow: hidden;
  user-select: none;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    ${disableUserDrag}
  }

  &:hover {
    cursor: ${({ isEmpty }) => (isEmpty ? "pointer" : "pointer")};
    border-color: ${({ theme }) => theme.colors.gray};
    background-color: ${({ theme }) => theme.opacityColors.paleGray_50};

    ${({ isEmpty, theme }) =>
      !isEmpty &&
      `
      border-color: ${theme.colors.primary}; 
      
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        background-color: ${theme.opacityColors.primary_20};
        background-image: url('src/assets/images/stamp.svg');         
        background-repeat: no-repeat;
        background-position: center;
        background-size: 40%;

        border-radius: 8px;
      }
    `}
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.paleGray};

    ${({ isEmpty, theme }) =>
      !isEmpty &&
      `
      &::after {
        background-color: ${theme.opacityColors.primary_30};
      }
    `}
  }
`;
