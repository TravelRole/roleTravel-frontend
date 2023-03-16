import React from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import SignForm from "./layout/SignForm";

const SignWrap = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 100px 20px;
  box-sizing: border-box;
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
  dl {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    dt {
      font-size: 1.2rem;
      font-weight: 400;
    }
    dd {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 1px solid #eee;
      text-align: center;
      line-height: 2.4rem;
      cursor: pointer;
    }
  }
`;

const SignContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #eee;
  padding-top: 20px;
  h2 {
    font-size: 1.2rem;
    margin-bottom: 30px;
  }
  .sign-text {
    text-align: right;
    width: 100%;
    color: #888;
    font-size: 0.8rem;
    span {
      color: red;
      margin-right: 5px;
    }
  }
`;

const Sign = () => {
  return (
    <SignWrap>
      <SignHeader>
        <h2>여행계획 회원가입</h2>
        <dl>
          <dt>소셜로 간편하게 로그인하세요</dt>
          <dd>
            <FcGoogle />
          </dd>
        </dl>
      </SignHeader>
      <SignContent>
        <h2>회원가입하고 다양한 혜택을 누리세요!</h2>
        <p className="sign-text">
          <span>*</span>필수 입력 정보
        </p>
        <SignForm />
      </SignContent>
    </SignWrap>
  );
};

export default Sign;
