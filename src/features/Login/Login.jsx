import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";
import { getUserInfo } from "../Landing/userSlice";
import { login } from "./authSlice";

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
import authBg from "../../assets/images/authBg.png";
import Header from "../layout/Header";
import { getTravelList } from "../SpaceList/travelSlice";

const LoginWrap = styled.div`
  width: 100%;
  height: calc(100vh - 10rem);
  background-image: url(${authBg});
  background-size: cover cover;
  background-repeat: no-repeat;
  background-position: 100% 100%;
  padding-top: 2rem;
`;

const LoginContainer = styled.div`
  width: 100%;
  max-width: 54rem;
  padding: 6rem 8.5rem;
  background-color: #fff;
  box-shadow: 0rem 0.4rem 1rem 0.5rem #e6edf9;
  border-radius: 3rem;
  margin: 0 auto;
`;

const LoginHeader = styled.div`
  dl {
    text-align: center;
    margin-bottom: 4rem;
    dt {
      margin-bottom: 1rem;
      font-size: 3.2rem;
      font-weight: 500;
    }
    dd {
      font-size: 1.9rem;
      color: #585858;
      font-weight: 400;
    }
  }
`;

const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    position: relative;
    margin: 3rem 0 2.5rem 0;
    text-align: center;
    font-size: 1.4rem;
    color: #d7d7d7;
    width: 100%;

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 44%;
      height: 0.1rem;
      background-color: #d7d7d7;
    }
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 44%;
      height: 0.1rem;
      background-color: #d7d7d7;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    margin-bottom: 1.5rem;
    align-items: center;
    button.login-btn {
      margin-top: 1rem;
    }
  }
  ul {
    display: flex;
    align-items: center;
    gap: 2rem;

    li {
      a {
        font-size: 1.4rem;
        color: #777;
      }
    }

    li:first-child {
      position: relative;

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: -1rem;
        transform: translateY(-50%);
        width: 0.1rem;
        height: 1.7rem;
        background-color: #acacac;
      }
    }
  }

  .googleSub {
    font-size: 1.5rem;
    font-weight: 400;
    color: #a8a8a8;
    margin-top: 1.5rem;
  }
`;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ email: false, password: false });

  // password type 변경 이벤트들
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // 구글 로그인 이벤트
  const onClickGoogle = useCallback(() => {
    window.location.assign(
      `${process.env.REACT_APP_BASE_URL}oauth2/authorization/google`
    );
  }, []);

  // 입력된 정보가 없을 때 에러메세지 보여주는 함수
  const InputNull = (e) => {
    if (e.currentTarget.name === "email" && !e.currentTarget.value)
      return setError({ email: true, password: false });
    if (e.currentTarget.name === "password" && !e.currentTarget.value)
      return setError({ email: false, password: true });
    setError({ email: false, password: false });
  };

  // 로그인 submit 이벤트
  const loginSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const loginPayload = { email: email, password: password };
    if (!email || !password) return alert("아이디와 패스워드를 적어주세요!");
    dispatch(login(loginPayload)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/spaceList");
        dispatch(getUserInfo());
        dispatch(getTravelList());
        return;
      }
    });

    //아래에 loginPayload 를 담아서 서버로 전송하는 코드를 적어주세요!
  };

  return (
    <>
      <Header />
      <LoginWrap>
        <LoginContainer>
          <LoginHeader>
            <dl>
              <dt>로그인</dt>
              <dd>기본 정보를 입력해주세요</dd>
            </dl>
          </LoginHeader>

          <LoginContent>
            <form onSubmit={loginSubmit}>
              <TextField
                label="이메일"
                type="search"
                fullWidth
                error={error.email} // error 속성 추가
                helperText={error.email ? "필수정보입니다" : ""} // helperText 속성 추가
                name="email"
                onBlur={InputNull}
                placeholder="이메일(아이디)를 입력해주세요."
              />

              <FormControl variant="outlined" fullWidth>
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  error={error.password}
                >
                  비밀번호
                </InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff sx={{ fontSize: 24 }} />
                        ) : (
                          <Visibility sx={{ fontSize: 24 }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  name="password"
                  error={error.password}
                  onBlur={InputNull}
                  placeholder="비밀번호를 입력해주세요."
                />
                <FormHelperText
                  error={error.password}
                  id="outlined-weight-helper-text"
                >
                  {error.password ? "필수 정보입니다." : ""}
                </FormHelperText>
              </FormControl>

              <Button type="submit" color="blue" size="full">
                기존 회원 로그인
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
              className="login_btn"
              color="kakao"
              size="full"
              onClick={onClickGoogle}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "500",
              }}
            >
              <Icons.RiKakaoTalkFill
                style={{
                  marginRight: "0.8rem",
                  width: "2rem",
                  height: "2rem",
                }}
              />
              카카오로 로그인
            </Button>
            <div className="googleSub">카카오로 1초만에 가입하세요.</div>
          </LoginContent>
        </LoginContainer>
      </LoginWrap>
    </>
  );
};

export default Login;
