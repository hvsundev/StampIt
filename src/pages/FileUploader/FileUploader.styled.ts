/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Section = styled.div`
  padding: 12px;
`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const PdfUpload = styled.div`
  min-height: 48px;
`;

export const PdfFile = styled.div`
  min-height: 48px;
`;

export const StampUpload = styled.div`
  min-height: 48px;
`;

export const Stamps = styled.div`
  display: flex;
  gap: 8px;
  min-height: 54px;

  img {
    cursor: pointer;
    width: 48px;
    height: 48px;
    border-radius: 4px;
  }
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const RemoveButton = styled.div`
  button {
    padding: 4px 8px;
    border-radius: 12px;
    background-color: transparent;
    color: #5e5e5e;
    font-size: 16px;
  }
`;
