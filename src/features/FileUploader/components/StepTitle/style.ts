import styled from "@emotion/styled";

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
  background-color: ${({ theme }) => theme.colors.black};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  line-height: 20px;
`;
