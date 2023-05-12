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
  width: 358px;
  height: 541px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 16px;
  padding-top: 26px;
  z-index: 10;
`;

export const Section = styled.section`
  height: ${(props) => props.height};
  width: 100%;
  padding-left: 24px;
  padding-right: 24px;

  &:nth-child(1) {
    border-bottom: 1px solid #e6e6e6;

    & > h1 {
      font-weight: 500;
      font-size: 24px;
      color: #333333;
      margin-top: -5px;
    }
  }

  &:nth-child(2) {
    margin-top: 16px;
    display: flex;
    flex-direction: column;

    & > h1 {
      font-size: 16px;
      font-weight: 500;
      color: #8b8b8b;
      margin-bottom: 28px;
    }
  }

  &:nth-child(3) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-top: 1px solid #e6e6e6;
  }
`;

export const Explanation = styled.div`
  & > p {
    font-size: 14px;
    font-weight: 400;
    color: #585858;
    line-height: 17px;
    margin-left: 10px;
  }

  & > p:nth-child(1) {
    margin-bottom: 5px;
  }
`

export const Image = styled.img`
  width: 144px;
  height: 144px;
  border-radius: 100%;
  background: #e3e3e3;
  margin: 0 auto;
  margin-bottom: 32px;
`;

export const Button = styled.button`
  border: 1px solid #dadada;
  border-radius: 8px;
  width: 150px;
  height: 45px;
  background: ${(props) => props.backgroundColor};
  font-weight: 400;
  font-size: 13px;
  color: #676767;
  cursor: pointer;
`;

export const ButtonFab = styled.div`
  border: 1px solid #dadada;
  border-radius: 8px;
  width: 150px;
  height: 45px;
  background: #fff;
  text-align: center;
  align-self: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  color: #8b8b8b;
`;

export const Title = styled.span`
  font-family: "Unbounded", cursive;
  font-size: 16px;
  color: #ffc759;
  margin-bottom: 14px;
`;
