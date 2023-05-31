import styled from "styled-components";

export const ModalWrapper = styled.div`
  width: 100%;
  height: 23.3rem;
  box-shadow: 0rem 2rem 2rem rgba(0, 0, 0, 0.08), 0rem 0rem 0.2rem rgba(0, 0, 0, 0.12);
  border-radius: 1.6rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: none;
  padding: 2rem 2.4rem 2rem 2.4rem;
`;

export const Section = styled.div`
  width: 100%;
  height: ${(props) => props.height};
  display: flex;

  &:nth-child(1) {
    margin-top: 2rem;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2.5rem;
  }

  &:nth-child(2) {
    justify-content: center;
    gap: 1rem;
  }
`;

export const Error = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border: 0.3rem solid #ffc759;
  border-radius: 100%;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #333333;
  margin-top: 1.5rem;
  margin-bottom: 1.6rem;
`;

export const Span = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
  color: #8b8b8b;
`;

export const Button = styled.button`
  width: 18rem;
  height: 4.5rem;
  font-size: 1.6rem;
  font-weight: 500;
  border-radius: 0.8rem;
  cursor: pointer;
  background: ${(props) => (props.color === "blue" ? "#3884fd" : "#fff")};
  border: ${(props) => (props.color === "blue" ? "none" : "0.1rem solid #c4c4c4")};
  color: ${(props) => (props.color === "blue" ? "#fafafa" : "#333333")};
`;
