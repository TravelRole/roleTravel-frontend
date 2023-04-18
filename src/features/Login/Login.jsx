import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";
import { getUserInfo } from "../Landing/userSlice";
import { login, refreshTokenAsync } from "./authSlice";

import Icons from "../../assets/icon/icon";

import IconButton from "@mui/material/IconButton";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";

import Map from "../layout/Map";
import RoleLogo from "../../assets/images/RoleTravelRogo.png";

const LoginWrap = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginContainer = styled.div`
  width: 33.75rem;
  height: 43.125rem;
  padding: 4.375rem;
  box-shadow: 0px 4px 15px rgba(92, 119, 163, 0.25);
  border-radius: 30px;
`;

const LoginHeader = styled.div`
  dl {
    text-align: center;
    margin-bottom: 30px;
    dt {
      margin-bottom: 20px;
      font-size: 2rem;
      letter-spacing: 0.1rem;
      font-weight: bold;
    }
    dd {
      font-size: 1.188rem;
      color: #585858;
      font-weight: 500;
    }
  }
`;

const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    position: relative;
    margin: 50px 0;
    text-align: center;
    font-size: 0.8rem;
    color: #949494;
    width: 100%;

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

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    margin-bottom: 30px;
    align-items: center;
    /* input {
      width: 100%;
      box-sizing: border-box;
      padding: 18px 30px;
      border: 1px solid #ddd;
      outline: none;
    } */
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

  .googleSub {
    font-size: 1rem;
    font-weight: 400;
    color: rgba(168, 168, 168, 1);
    margin-top: 1rem;
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
  }
    const onLoginSubmit = useCallback(
      (e) => {
        e.preventDefault();
        dispatch(login(formData));
      },
      [dispatch, formData]
    );

    // const onClickRefresh = useCallback(() => {
    //   dispatch(refreshTokenAsync());
    // }, [dispatch]);

    const onClickGoogle = useCallback(() => {
      window.location.assign(
        `${process.env.REACT_APP_BASE_URL}oauth2/authorization/google`
      );
    }, []);

  

    const InputNull = (e) => {
      if (e.currentTarget.name === "email" && !e.currentTarget.value)
        return setError({ email: true, password: false });
      if (e.currentTarget.name === "password" && !e.currentTarget.value)
        return setError({ email: false, password: true });
      setError({ email: false, password: false });
    };

    const loginSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email");
      const password = formData.get("password");
      const loginPayload = { email, password };
      if (!email || !password) return alert("아이디와 패스워드를 적어주세요!");
      console.log(loginPayload);

      //아래에 loginPayload 를 담아서 서버로 전송하는 코드를 적어주세요!
    };

    return (
      <LoginWrap>
        {/* <img src={RoleLogo} style={{width:"500px"}} /> */}
        <Map />
        <LoginContainer>
          <LoginHeader>
            <dl>
              <dt>로그인</dt>
              <dd>기본정보를 입력해주세요</dd>
            </dl>
          </LoginHeader>

          <LoginContent>
            <form onSubmit={loginSubmit}>
              <TextField
                id="outlined-search"
                label="E-mail"
                type="search"
                fullWidth
                error={error.email} // error 속성 추가
                helperText={error.email ? "필수정보입니다" : ""} // helperText 속성 추가
                name="email"
                onBlur={InputNull}
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
                  helperText={
                    error.password
                      ? "* 8~16자 영문 대 소문자,숫자,특수문자를 사용하세요."
                      : ""
                  }
                  onBlur={InputNull}
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

              <Button
                type="submit"
                color="#3884fd"
                size="full"
                borderRadius="10px"
              >
                기존회원 로그인
              </Button>
            </form>

            <ul>
              <li>
                <Link
                  to="/searchIdPw"
                  style={{ textDecoration: "none", color: "#666" }}
                >
                  아이디 &#183; 비밀번호 찾기
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
            <span>또는</span>
            <Button
              color="#fff"
              border="solid rgba(218, 218, 218, 1) 1px"
              size="full"
              onClick={onClickGoogle}
              borderRadius="10px"
            >
              <Icons.FcGoogle style={{ marginRight: "0.5rem" }} />
              Google로 로그인
            </Button>
            <div className="googleSub">구글로 1초만에 가입하세요.</div>
          </LoginContent>
        </LoginContainer>
      </LoginWrap>
    );
  };

export default Login;
