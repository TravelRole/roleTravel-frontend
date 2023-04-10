import React from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import SignForm from "./layout/SignForm";
import Header from "../layout/Header";
import authBg from "../../assets/images/authBg.png";

const SignWrap = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  background-image: url(authBg);
`;
const SignHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  padding-bottom: 20px;
  h2 {
    font-size: 1.8rem;
  }
`;

const SignContainer = styled.div``;

const Sign = () => {
  return (
    <>
      <Header />
      <SignWrap>
        <SignContainer>
          <SignHeader>
            <h2>여행계획 회원가입</h2>
            <p>기본 정보를 입력해주세요</p>
          </SignHeader>

          <SignForm />
        </SignContainer>
      </SignWrap>
    </>
  );
};

export default Sign;
