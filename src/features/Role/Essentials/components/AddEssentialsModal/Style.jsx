import styled from "styled-components";

export const ContentWrapper = styled.div`
  width: 700px;
  height: 690px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  background-color: #fff;
  border-radius: 20px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Section = styled.section`
  height: ${(props) => props.height};
  width: 100%;
  padding-left: 29px;
  padding-right: 29px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: center;

  &:nth-child(2) {
    gap: 14px;
    margin-bottom: 19px;
  }

  &:nth-child(3) {
    gap: 14px;
    margin-bottom: 22px;
  }
`;

export const EssentialsModalSpan = styled.span`
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
`;

export const Card = styled.div`
  width: 150px;
  height: 270px;
  background: #fff;
  border: 1px solid #ababab;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 12px 19px 8px 19px;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 208px;
`;

export const Dot = styled.div`
  width: 8px;
  height: 8px;
  background: ${(props) => (props.clicked ? "#ababab" : "#fff")};
  border: ${(props) => (props.clicked ? "none" : "1px solid #ababab;")};
  margin-right: 7px;
  border-radius: 100%;
  margin-top: 2px;
  cursor: pointer;
`;
