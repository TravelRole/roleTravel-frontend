import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "../../../components/Button";
import RadioButton from "../../../components/RadioButton";
import { signUp } from "../signSlice";
import SignCheckBox from "./SignCheckBox";
import SignInput from "./SignInput";

// 중복 컴포넌트
const InfoButton = styled.button`
  border: 1px solid #ddd;
  background-color: #eee;
  cursor: pointer;
`;

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

const SignRadioBoxWrap = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .radio-container {
    display: flex;
    gap: 20px;
  }
`;

const RadioWrap = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  input[type="radio"] {
    appearance: none;
    border: 1px solid #ddd;
    border-radius: 50%;
    width: 1.2rem;
    height: 1.2rem;
    margin: 0;

    &:checked {
      background-color: #3884fd;
      border: none;
    }
  }
`;

const initialMessage = {
  userName: "",
  email: "",
  password: "",
  confirmPw: "",
  birth: "",
};

const SignForm = () => {
  const [errorData, setErrorData] = useState(initialMessage);
  const [formData, setFormData] = useState({
    userName: "",
    birth: "",
    email: "",
    password: "",
    confirmPassword: "",
    check: { termsUse: true, emailUse: false },
    // expiration: null,
  });

  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(signUp(formData));
    },
    [dispatch, formData]
  );

  // 포커싱이 사라질 때 유효성 검사를 시작함
  // 1. 빈 값일 경우에 "* 필수 정보입니다."
  // 2. 비밀번호 - 검사에 어긋난 값 입력 시 "사용 불가 (안전도 등급 매우 약함)"
  //           - 검사에 유효한 값 입력 시  "사용 가능 (안전도 등급 높음)"

  return (
    <SignFormWrap autoComplete="off" onSubmit={onSubmit}>
      <SignUserInfo>
        <SignInput
          inputProps={{
            type: "text",
            placeholder: "이름(실명)을 입력해주세요.",
            width: "100%",
          }}
          name={"userName"}
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
            type: "password",
            placeholder: "비밀번호를 다시 입력해주세요.",
            width: "100%",
          }}
          name={"confirmPassword"}
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

      {/* check box section */}
      <SignCheckBox setFormData={setFormData} formData={formData} />
      {/* <SignRadioBoxWrap>
        <p>
          <span>*</span> 개인정보 유효기간 선택
        </p>

        <div className="radio-container">
          <RadioWrap>
            <RadioButton id="radio1" name="userInfoCheck" value="oneYear" />
            <label htmlFor="radio1">1년</label>
          </RadioWrap>
          <RadioWrap>
            <RadioButton id="radio2" name="userInfoCheck" value="threeYear" />
            <label htmlFor="radio2">3년</label>
          </RadioWrap>
          <RadioWrap>
            <RadioButton id="radio3" name="userInfoCheck" value="infoQuit" />
            <label htmlFor="radio3">회원탈퇴시</label>
          </RadioWrap>
        </div>
      </SignRadioBoxWrap> */}

      <Button type="submit" size="full" color="#3884fd">
        가입하기
      </Button>
    </SignFormWrap>
  );
};

export default SignForm;
