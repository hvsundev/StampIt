import styled from "@emotion/styled";

export const FileUploaderWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const FileUploaderSection = styled.div`
  height: 50%;
  padding: 24px 30px;
`;

export const FileUploaderTop = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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
`;

export const PDFFile = styled.div``;

export const File = styled.div`
  display: flex;
  justify-content: space-between;
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

export const Descrition = styled.span`
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
}>`
  cursor: pointer;
  width: 70px;
  height: 70px;
  object-fit: contain;
  border-radius: 8px;
  border: ${({ isSelected }) =>
    isSelected ? "2px solid red" : `1px solid #e4e4e4`};
  background-color: ${({ theme }) => theme.colors.gray};
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
