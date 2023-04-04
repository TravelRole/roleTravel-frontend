import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";
import { getUserInfo } from "../Landing/userSlice";
import { login, refreshTokenAsync } from "./authSlice";
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
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeInput = useCallback(
    (e) => {
      const { name, value } = e.target;
      if (name === "id") {
        setFormData({ ...formData, email: value });
        return;
      }
      setFormData({ ...formData, password: value });
    },
    [formData]
  );

  const onLoginSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(login(formData));
    },
    [dispatch, formData]
  );

  const onClickGoogle = useCallback(() => {
    window.location.assign("http://localhost:8080/oauth2/authorization/google");
  }, []);

  useEffect(() => {
    if (isAuth) {
      // window.location.replace("/userid");
      navigate("/userid");
    }
  }, [isAuth, navigate]);

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
          <Button color="#3884fd" size="full" onClick={onClickGoogle}>
            Sign in with Google
          </Button>
        </LoginHeader>
        <p>또는</p>
        <LoginContent>
          <form onSubmit={onLoginSubmit}>
            <input
              type="text"
              name="id"
              placeholder="아이디를 입력해주세요."
              onChange={onChangeInput}
            />
            <input
              type="password"
              name="pw"
              placeholder="비밀번호를 입력해주세요."
              onChange={onChangeInput}
            />
            <Button type="submit" color="#000" size="large">
              기존 회원 로그인
            </Button>
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
