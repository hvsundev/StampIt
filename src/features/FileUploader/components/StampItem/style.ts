import styled from "@emotion/styled";
import { disableUserDrag } from "@/assets/styles/mixins.ts";

export const StampImage = styled.div<{ isEmpty: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc((100% - 16px) / 3);
  aspect-ratio: 1;
  border-radius: 8px;
  user-select: none;
  border: 1px solid ${({ theme }) => theme.colors.paleGray};
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s;

  > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    ${disableUserDrag}
  }

  &:hover .delete-button {
    opacity: 1;
  }

  &:hover {
    border-color: ${({ theme, isEmpty }) =>
      isEmpty ? theme.colors.gray : theme.colors.primary};
    background-color: ${({ theme }) => theme.opacityColors.paleGray_50};

    ${({ isEmpty, theme }) =>
      !isEmpty &&
      `
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

export const DeleteButton = styled.button`
  position: absolute;
  top: -6px;
  right: -6px;
  cursor: pointer;
  opacity: 0;
  z-index: 1;
  transition: opacity 0.2s;

  img {
    width: 20px;
    height: 20px;
  }
`;
