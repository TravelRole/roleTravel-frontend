import styled from "styled-components";

export const Blur = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const ModalWrapper = styled.div`
  width: 418px;
  height: 233px;
  box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.08), 0px 0px 2px rgba(0, 0, 0, 0.12);
  border-radius: 16px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: none;
  padding: 20px 24px 20px 24px;
`;

export const Section = styled.div`
  width: 100%;
  height: ${(props) => props.height};
  display: flex;

  &:nth-child(1) {
    margin-top: 20px;
    flex-direction: column;
    align-items: center;
    margin-bottom: 25px;
  }

  &:nth-child(2) {
    justify-content: center;
    gap: 10px;
  }
`;

export const Error = styled.div`
  width: 35px;
  height: 35px;
  border: 3px solid #ffc759;
  border-radius: 100%;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #333333;
  margin-top: 15px;
  margin-bottom: 16px;
`;

export const Span = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
  color: #8b8b8b;
`;

export const Button = styled.button`
  width: 180px;
  height: 45px;
  font-size: 1.6rem;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  background: ${(props) => (props.color === "blue" ? "#3884fd" : "#fff")};
  border: ${(props) => (props.color === "blue" ? "none" : "1px solid #c4c4c4")};
  color: ${(props) => (props.color === "blue" ? "#fafafa" : "#333333")};
`;
