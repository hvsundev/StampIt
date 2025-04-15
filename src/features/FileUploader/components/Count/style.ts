import styled from "@emotion/styled";

export const Count = styled.span`
  font-size: 14px;
  display: flex;
  justify-content: flex-end;

  span {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary[500]};
  }
`;
