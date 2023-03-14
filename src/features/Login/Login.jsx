import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginWrap = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginContainer = styled.div`
  width: 450px;

  p {
    position: relative;
    margin: 50px 0;
    text-align: center;
    font-size: 0.8rem;
    color: #949494;

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 40%;
      height: 1px;
      background-color: #ddd;
    }

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 40%;
      height: 1px;
      background-color: #ddd;
    }
  }
`;

const LoginHeader = styled.div`
  dl {
    text-align: center;
    margin-bottom: 30px;
    dt {
      margin-bottom: 20px;
      font-size: 1.8rem;
      letter-spacing: 0.1rem;
      font-weight: bold;
    }
    dd {
      font-size: 0.9rem;
      color: #555;
      font-weight: lighter;
    }
  }
  button {
    width: 100%;
    padding: 10px 0;
    color: #fff;
    background-color: #3884fd;
    font-size: 0.9rem;
    font-weight: lighter;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    margin-bottom: 30px;
    align-items: center;
    input {
      width: 100%;
      box-sizing: border-box;
      padding: 18px 30px;
      border: 1px solid #ddd;
      outline: none;
    }
    button {
      width: 60%;
      padding: 10px 0;
      margin-top: 20px;
      border: none;
      background-color: black;
      color: #fff;
      border-radius: 5px;
      cursor: pointer;
    }
  }

  ul {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 1rem;
    color: #666;
    li:first-child {
      position: relative;
      &::after {
        content: "";
        position: absolute;
        top: 43%;
        right: -10px;
        transform: translateY(-50%);
        width: 1px;
        height: 100%;
        background-color: #909090;
      }
    }
  }
`;

const Login = () => {
  return (
    <LoginWrap>
      <LoginContainer>
        <LoginHeader>
          <dl>
            <dt>LOG IN / JOIN</dt>
            <dd>
              아이디와 비밀번호 입력하기 귀찮으시죠? <br /> 구글로 1초만에
              로그인하세요.
            </dd>
          </dl>
          <button>Sign in with Google</button>
        </LoginHeader>
        <p>또는</p>
        <LoginContent>
          <form>
            <input type="text" placeholder="아이디를 입력해주세요." />
            <input type="password" placeholder="비밀번호를 입력해주세요." />
            <button type="submit">기존 회원 로그인</button>
          </form>
          <ul>
            <li>
              <Link
                to="/searchIdPw"
                style={{ textDecoration: "none", color: "#666" }}
              >
                아이디 / 비밀번호 찾기
              </Link>
            </li>
            <li>
              <Link
                to="/sign"
                style={{ textDecoration: "none", color: "#666" }}
              >
                회원가입
              </Link>
            </li>
          </ul>
        </LoginContent>
      </LoginContainer>
    </LoginWrap>
  );
};

export default Login;
