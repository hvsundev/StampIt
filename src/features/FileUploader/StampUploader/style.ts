import styled from "@emotion/styled";

export const Uploader = styled.div``;

export const UploadHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
`;

export const UploadContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
