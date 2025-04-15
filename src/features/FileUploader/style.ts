import styled from "@emotion/styled";

export const FileUploaderWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.base.white};
`;

export const FileUploaderSection = styled.div`
  padding: 24px 30px;
`;

export const FileUploaderContent = styled.div`
  display: flex;
  flex-direction: column;
`;
