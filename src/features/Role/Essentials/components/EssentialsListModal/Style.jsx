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
  width: 774px;
  height: 824px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  background-color: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding-top: 21px;
`;

export const Section = styled.section`
  height: ${(props) => props.height};
  width: 100%;
  padding-left: 24px;
  padding-right: 24px;

  &:nth-child(1) {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    border-bottom: 1px solid #e6e6e6;
    padding-bottom: 22px;
  }

  &:nth-child(2) {
    margin-top: 16px;
    margin-bottom: 21px;
    display: flex;
    flex-direction: column;
  }

  &:nth-child(3) {
    gap: 10px;
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
  }

  &:nth-child(4) {
    gap: 10px;
    display: flex;
    justify-content: space-between;
    justify-content: center;
    margin-bottom: 26px;
  }

  &:nth-child(5) {
    display: flex;
    gap: 10px;
    justify-content: right;
    align-items: center;
    border-top: 1px solid #E6E6E6;
  }
`;

export const EssentialsModalSpan = styled.span`
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
`;

export const Card = styled.div`
  width: 174px;
  height: 268px;
  background: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 208px;
  padding-left: 15.7px;
  padding-top: 8px;
`;

export const Dot = styled.div`
  width: 13px;
  height: 13px;
  background: #fff;
  border: 1px solid #dadada;
  margin-right: 6.7px;
  border-radius: 100%;
  cursor: pointer;
`;

export const Title = styled.span`
  font-family: "Unbounded", cursive;
  font-weight: 600;
  font-size: 1.6rem;
  color: #ffc759;
  margin-bottom: 8px;
`;

export const Emphasis = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
  color: #3884fd;
`;

export const CardHeader = styled.div`
  padding: 13px 13px 10px 13px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AllButton = styled.button`
  padding: 4px 10px;
  border-radius: 99px;
  font-size: 1.2rem;
  font-weight: 600;
  background: ${(props) => (props.allChecked ? "#3884fd" : "#fff")};
  color: ${(props) => (props.allChecked ? "#fff" : "#DADADA")};
  border: ${(props) =>
    props.allChecked ? "1px solid #3884fd" : "1px solid #DADADA"};
  cursor: pointer;
`;

export const CheckSpan = styled.span`
  color: ${(props) => (props.clicked ? "#3884fd" : "#8b8b8b")};
  font-size: 1.4rem;
  font-weight: 500;
`;

export const ModalButton = styled.button`
  width: 90px;
  height: 40px;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 600;
  color: ${(props) => props.color};
  background: ${(props) => props.background};
  border: ${(props) => props.border};
  border-radius: 8px;
  cursor: pointer;
`;
