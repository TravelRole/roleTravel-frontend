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

export const ContentWrapper = styled.div`
  width: 77.4rem;
  height: 82.4rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  background-color: #fff;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  padding-top: 2.1rem;
`;

export const Section = styled.section`
  height: ${(props) => props.height};
  width: 100%;
  padding-left: 2.4rem;
  padding-right: 2.4rem;

  &:nth-child(1) {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    border-bottom: 0.1rem solid #e6e6e6;
    padding-bottom: 2.2rem;
  }

  &:nth-child(2) {
    margin-top: 1.6rem;
    margin-bottom: 2.1rem;
    display: flex;
    flex-direction: column;
  }

  &:nth-child(3) {
    gap: 1rem;
    display: flex;
    margin-bottom: 1rem;
    justify-content: space-between;
  }

  &:nth-child(4) {
    gap: 1rem;
    display: flex;
    justify-content: space-between;
    justify-content: center;
    margin-bottom: 2.6rem;
  }

  &:nth-child(5) {
    display: flex;
    gap: 1rem;
    justify-content: right;
    align-items: center;
    border-top: 0.1rem solid #E6E6E6;
  }
`;

export const EssentialsModalSpan = styled.span`
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
`;

export const Card = styled.div`
  width: 17.4rem;
  height: 26.8rem;
  background: #fff;
  border: 0.1rem solid #e6e6e6;
  border-radius: 0.8rem;
  display: flex;
  flex-direction: column;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 20.8rem;
  padding-left: 1.57rem;
  padding-top: 0.8rem;
`;

export const Dot = styled.div`
  width: 1.3rem;
  height: 1.3rem;
  background: #fff;
  border: 0.1rem solid #dadada;
  margin-right: 0.67rem;
  border-radius: 100%;
  cursor: pointer;
`;

export const Title = styled.span`
  font-family: "Unbounded", cursive;
  font-weight: 600;
  font-size: 1.6rem;
  color: #ffc759;
  margin-bottom: 0.8rem;
`;

export const Emphasis = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
  color: #3884fd;
`;

export const CardHeader = styled.div`
  padding: 1.3rem 1.3rem 1rem 1.3rem;
  border-bottom: 0.1rem solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AllButton = styled.button`
  padding: 0.4rem 1rem;
  border-radius: 9.9rem;
  font-size: 1.2rem;
  font-weight: 600;
  background: ${(props) => (props.allChecked ? "#3884fd" : "#fff")};
  color: ${(props) => (props.allChecked ? "#fff" : "#DADADA")};
  border: ${(props) =>
    props.allChecked ? "0.1rem solid #3884fd" : "0.1rem solid #DADADA"};
  cursor: pointer;
`;

export const CheckSpan = styled.span`
  color: ${(props) => (props.clicked ? "#3884fd" : "#8b8b8b")};
  font-size: 1.4rem;
  font-weight: 500;
`;

export const ModalButton = styled.button`
  width: 9rem;
  height: 4rem;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 600;
  color: ${(props) => props.color};
  background: ${(props) => props.background};
  border: ${(props) => props.border};
  border-radius: 0.8rem;
  cursor: pointer;
`;
