import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../components/Button";
import { signUp } from "../signSlice";
import SignInput from "./SignInput";

// 컨테이너 컴포넌트

const SignFormWrap = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
`;

const SignUserInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .user-birth {
    width: 100%;
    gap: 10px;
    display: flex;
    justify-content: space-between;
  }
`;

const CheckBoxWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    gap: 10px;
    align-items: center;

    input {
      appearance: none;
      border: 1px solid #ddd;
      width: 1.5rem;
      height: 1.5rem;
      cursor: pointer;

      &:checked {
        background-image: url("data:image/svg+xml,%3Csvg width='30' height='25' viewBox='0 0 30 25' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 13.2245L9.78751 22.6089C10.1572 23.0544 10.7783 23.0544 11.148 22.6089L28.25 2' stroke='%233884FD' stroke-width='3' stroke-linecap='round'/%3E%3C/svg%3E");
        background-size: 80% 80%;
        background-position: 50%;
        background-repeat: no-repeat;
      }
    }
  }
`;

const SignForm = () => {
  const [errorData, setErrorData] = useState({
    name: "",
    email: "",
    password: "",
    birth: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    birth: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(signUp(formData));
    },
    [dispatch, formData]
  );

  return (
    <>
      <SignFormWrap autoComplete="off" onSubmit={onSubmit}>
        {/* input */}
        <SignUserInfo>
          <SignInput
            inputProps={{
              type: "text",
              placeholder: "이름(실명)을 입력해주세요.",
              width: "100%",
            }}
            name={"name"}
            errorData={errorData}
            setErrorData={setErrorData}
            setFormData={setFormData}
            formData={formData}
          />

          <SignInput
            inputProps={{
              type: "email",
              placeholder: "이메일(아이디)를 입력해주세요.",
              width: "100%",
            }}
            name={"email"}
            errorData={errorData}
            setErrorData={setErrorData}
            setFormData={setFormData}
            formData={formData}
          />
          <SignInput
            inputProps={{
              type: "password",
              placeholder: "비밀번호를 입력해주세요.",
              width: "100%",
            }}
            name={"password"}
            errorData={errorData}
            setErrorData={setErrorData}
            setFormData={setFormData}
            formData={formData}
          />
          <SignInput
            inputProps={{
              type: "text",
              placeholder: "생년월일을 입력해주세요. (YYYY/MM/DD)",
              width: "100%",
            }}
            name={"birth"}
            errorData={errorData}
            setErrorData={setErrorData}
            setFormData={setFormData}
            formData={formData}
          />
        </SignUserInfo>

        <CheckBoxWrap>
          <div>
            <input type="checkbox" name="termsUse" required={true} />
            <label>[필수] 이용 약관 및 개인 정보 수집 동의</label>
          </div>
          <p>내용 보기</p>
        </CheckBoxWrap>

        <Button type="submit" size="full" color="#3884fd">
          가입하기
        </Button>
      </SignFormWrap>
      <p>
        이미 계정이 있으신가요?<Link to="/login">로그인</Link>
      </p>
    </>
  );
};

export default SignForm;
