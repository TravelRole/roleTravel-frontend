import React from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import SignForm from "./layout/SignForm";
import Header from "../layout/Header";
import authBg from "../../assets/images/authBg.png";

const SignWrap = styled.div`
  width: 100%;
  height: calc(100vh - 10rem);
  background-image: url(${authBg});
  background-size: cover cover;
  background-repeat: no-repeat;
  background-position: 100% 100%;
  padding-top: 2rem;
`;
const SignHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  padding-bottom: 2rem;
  h2 {
    font-size: 3.2rem;
    font-weight: 500;
    color: #333;
  }
  p {
    font-size: 1.9rem;
    font-weight: 500;
    color: #868686;
  }
`;

const SignContainer = styled.div`
  width: 100%;
  max-width: 54rem;
  padding: 6rem 9.3rem;
  background-color: #fff;
  box-shadow: 0rem 0.4rem 1rem 0.5rem #e6edf9;
  border-radius: 3rem;
  margin: 0 auto;
`;

const Sign = () => {
  return (
    <>
      <Header />
      <SignWrap>
        <SignContainer>
          <SignHeader>
            <h2>회원가입</h2>
            <p>기본 정보를 입력해주세요</p>
          </SignHeader>

          <SignForm />
        </SignContainer>
      </SignWrap>
    </>
  );
};

export default Sign;
