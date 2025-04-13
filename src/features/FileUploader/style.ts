import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const FileUploaderWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const FileUploaderSection = styled.div`
  padding: 24px 30px;
`;

export const FileUploaderHeader = styled.div`
  padding: 24px 30px;

  h1 {
    font-size: 24px;
    letter-spacing: -0.3px;
    color: ${({ theme }) => theme.colors.primary};
  }

  img {
    width: 100px;
  }
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

export const DropArea = styled.div<{ isExistFile: boolean }>`
  position: relative;
  height: 80px;
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

  /* 🔵 기본 hover */
  &:hover {
    border-color: #1d5aff;
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
        border-color: #1d5aff;
        background-color: ${theme.colors.paleGray};

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
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  transition: 0.2s;
  padding: 8px 12px;
  border-radius: 10px;
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

export const StampImage = styled.img<{
  isSelected: boolean;
  isEmpty: boolean;
}>`
  width: 70px;
  height: 70px;
  object-fit: contain;
  border-radius: 8px;
  border: ${({ isSelected }) =>
    isSelected ? "2px solid #3b82f6" : `1px solid #e4e4e4`};
  // background-color: ${({ theme }) => theme.colors.paleGray};
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;

  &:hover {
    cursor: ${({ isEmpty }) => (isEmpty ? "unset" : "pointer")};
  }
`;

export const RemoveButton = styled.div``;
