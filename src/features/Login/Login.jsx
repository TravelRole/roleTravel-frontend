import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";
import { getUserInfo } from "../Landing/userSlice";
import { login, refreshTokenAsync } from "./authSlice";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
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
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ email: false, password: false });
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const loginPayload = {};
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email) return setError({ email: true, password: false });
    if (!password) return setError({ email: false, password: true });
    setError({ email: false, password: false });

    // dispatch(login(formData));
  };

  const onClickGoogle = useCallback(() => {
    window.location.assign(
      `${process.env.REACT_APP_BASE_URL}oauth2/authorization/google`
    );
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
          <form onSubmit={handleSubmit}>
            <TextField
              id="outlined-search"
              label={error.email ? "" : "이메일을 적어주세요"}
              type="search"
              fullWidth
              error={error.email} // error 속성 추가
              helperText={error.email ? "필수정보입니다" : ""} // helperText 속성 추가
              name="email"
            />

            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                name="password"
                error={error.password}
              />
              {error.password && (
                <FormHelperText
                  error={error.password}
                  id="outlined-weight-helper-text"
                >
                  필수정보입니다
                </FormHelperText>
              )}
            </FormControl>

            <Button type="submit" color="blue" size="full">
              기존회원 로그인
            </Button>
          </form>
        </LoginContent>
      </LoginContainer>
    </LoginWrap>
  );
};

export default Login;
