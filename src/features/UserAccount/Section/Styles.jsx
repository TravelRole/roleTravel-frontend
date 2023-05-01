import styled from "styled-components";
import GoogleIcon from '@mui/icons-material/Google';

export const Container = styled.div`
  width: 100%;
`;

export const Content = styled.div`
  width: 100%;

  &:nth-child(1){
    margin-bottom: 60px;

    h1 {
      font-style: normal;
      font-weight: 500;
      font-size: 3.2rem;
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
        font-size: 1.7rem;
        line-height: 25px;

        &:nth-child(1) {
          margin-bottom: 4px;
        }
      }
    }
  }

  &:nth-child(2){
    margin-bottom: 30px;
  }

  &:nth-child(3) {
    display: flex;
    justify-content: left;
    gap: 20px;
  }
`;

export const ContentWrap = styled.div`
  width: 100%;
  height: 550px;
  margin-left: 20px;
  margin-rigth: 20px;
  margin-top: 120px;
  display: flex;
  justify-content: center;
`

export const Section = styled.div`
  height: 100%;
  width: 100%;

  &:nth-child(1) {
    flex-direction: column;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
  }

  &:nth-child(2) {
    width: 100%;
    height: 463px;
  }

  &:nth-child(3) {
    width: 100%;
  }
`;

export const Profile = styled.div`
  width: 215px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div:nth-child(2) {
    display: flex;

    p, span {
      font-size: 2rem;
    }
  }
`

export const Avatar = styled.img`
  object-fit: cover;
  overflow: hidden;
  border-radius: 100%;
  width: 120px;
  height: 120px;
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
  font-size: 2rem;
  line-height: 24px;
  letter-spacing: -0.02em;
  color: ${(props) => props.color};
  cursor: pointer;
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
`

export const EditIcon = styled.div`
  background: white;
  width: 34.49px;
  height: 34.49px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
  margin-top: -60px;
  margin-left: 85px;
  position: absolute;
  border-radius: 100%;
  color: black;
  display: flex;
  justify-content: center;
  align-itemes: center;
  padding-top: 0.9rem;
  cursor: pointer;
`
