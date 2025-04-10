import styled from "@emotion/styled";

export const FileUploaderWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const FileUploaderSection = styled.div`
  padding: 12px;
`;

export const FileUploaderTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FileUploaderBottom = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const PDFUpload = styled.div`
  min-height: 48px;
`;

export const PDFFile = styled.div`
  min-height: 48px;
`;

export const StampUpload = styled.div`
  min-height: 48px;
`;

export const Stamps = styled.div`
  display: flex;
  gap: 8px;
  min-height: 54px;
`;

export const StampImage = styled.img<{
  isSelected: boolean;
}>`
  cursor: pointer;
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin: 0 8px;
  border: ${({ isSelected }) => (isSelected ? "2px solid red" : "none")};
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
