import styled from "styled-components";

export const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo",
    "Pretendard Variable", Pretendard, Roboto, "Noto Sans KR", "Segoe UI",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
  width: 100%;
`;

export const Content = styled.div`
  width: 100%;

  &:nth-child(1) {
    margin-bottom: 30px;
    margin-top: ${(props) => props.marginTop};

    h1 {
      font-style: normal;
      font-weight: 500;
      font-size: 32px;
      line-height: 43px;
      letter-spacing: -0.02em;
      margin-bottom: 10px;
      color: #101010;
    }

    div {
      width: 100%;
      padding: 13px 18px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      background: #f8f8f8;
      border-radius: 8px;
      height: ${(props) => props.height};
      margin-bottom: 20px;

      p {
        color: #585858;
        font-weight: 400;
        font-size: 17px;

        &:nth-child(1) {
          margin-bottom: 4px;
        }
      }
    }
  }

  &:nth-child(2) {
    margin-bottom: 50px;
  }

  &:nth-child(3) {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
`;

export const ContentWrap = styled.div`
  width: 100%;
  height: 550px;
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Section = styled.div`
  height: 80%;
  width: 100%;

  &:nth-child(1) {
    flex-direction: column;
    align-self: flex-start;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
  }

  &:nth-child(2) {
    flex-direction: column;
    width: 100%;
    height: 463px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:nth-child(3) {
    width: 100%;
  }
`;

export const Profile = styled.div`
  // width: 30%;
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Avatar = styled.img`
  object-fit: cover;
  overflow: hidden;
  border-radius: 100%;
  width: 120px;
  height: 120px;
  margin-top: 4.5rem;
  margin-bottom: 2rem;
`;

export const Nav = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #e1e1e1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 34px;
  padding-bottom: 10px;
`;

export const Tab = styled.span`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: -0.02em;
  color: ${(props) => props.color};
  cursor: pointer;
`;

export const Label = styled.label`
  font-size: 15px;
  width: ${(props) => props.width};
`;

export const Input = styled.input`
  border: 1px solid #cfcfcf;
  border-radius: 8px;
  height: 140%;
  width: 100%;
  padding-left: 8px;
  background: white;
  font-size: 18px;
  color: #a7a7a7;

  ::placeholder,
  ::-webkit-input-placeholder {
    font-size: 18px;
  }
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 35px;

  &:nth-child(3) {
    margin-bottom: 0px;
  }
`;

export const Button = styled.button`
  cursor: pointer;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;

  width: 130px;
  height: 45px;
  border-radius: 8px;
  border: ${(props) => props.border};
`;
