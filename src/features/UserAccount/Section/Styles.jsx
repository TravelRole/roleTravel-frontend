import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const Content = styled.div`
  width: 100%;

  &:nth-child(1) {
    margin-bottom: 6rem;

    h1 {
      font-style: normal;
      font-weight: 500;
      font-size: 3.2rem;
      line-height: 4.3rem;
      letter-spacing: -0.02em;
      margin-bottom: 1rem;
      color: #101010;
    }

    div {
      width: 100%;
      padding: 1.3rem 1.8rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      background: #f8f8f8;
      border-radius: 0.8rem;
      height: ${(props) => props.height};
      margin-bottom: 2rem;

      p {
        color: #585858;
        font-weight: 400;
        font-size: 1.7rem;
        line-height: 2.5rem;

        &:nth-child(1) {
          margin-bottom: 0.4rem;
        }
      }
    }
  }

  &:nth-child(2) {
    margin-bottom: 3rem;
  }

  &:nth-child(3) {
    display: flex;
    justify-content: left;
    gap: 2rem;
  }
`;

export const ContentWrap = styled.div`
  width: 100%;
  height: 55rem;
  margin-left: 2rem;
  margin-right: 2rem;
  margin-top: 12rem;
  display: flex;
  justify-content: center;
`;

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
    height: 46.3rem;
  }

  &:nth-child(3) {
    width: 100%;
  }
`;

export const Profile = styled.div`
  width: 21.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div:nth-child(2) {
    display: flex;

    p,
    span {
      font-size: 2rem;
    }
  }
`;

export const Avatar = styled.img`
  object-fit: cover;
  overflow: hidden;
  border-radius: 100%;
  width: 12rem;
  height: 12rem;
  margin-bottom: 2rem;
`;

export const Nav = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 6rem;
  border-bottom: 0.1rem solid #e1e1e1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3.4rem;
  margin-top: 10rem;
  padding-bottom: 1rem;
`;

export const Tab = styled.span`
  font-weight: 400;
  font-size: 2rem;
  line-height: 2.4rem;
  letter-spacing: -0.02em;
  color: ${(props) => props.color};
  cursor: pointer;
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 3.5rem;

  &:nth-child(3) {
    margin-bottom: 0rem;
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
  gap: 0.5rem;

  width: 13rem;
  height: 4.5rem;
  border-radius: 0.8rem;
  border: ${(props) => props.border};
`;

export const EditIcon = styled.div`
  background: white;
  width: 3.449rem;
  height: 3.449rem;
  box-shadow: 0rem 0.1rem 0.2rem rgba(0, 0, 0, 0.25);
  margin-top: -6rem;
  margin-left: 8.5rem;
  position: absolute;
  border-radius: 100%;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 0.9rem;
  cursor: pointer;
`;
