import styled from "@emotion/styled";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ConfirmBox = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 360px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  color: #222;
`;

export const Description = styled.p`
  margin: 0;
  font-size: 14px;
  color: #555;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;
