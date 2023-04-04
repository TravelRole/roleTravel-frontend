import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "../../../components/Button";
import { signUp } from "../signSlice";
import SignCheckBox from "./SignCheckBox";
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

const SignForm = () => {
  const [errorData, setErrorData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birth: "",
  });
  const [formData, setFormData] = useState({
    userName: "",
    birth: "",
    email: "",
    password: "",
    confirmPassword: "",
    check: { termsUse: true, emailUse: false },
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
    <SignFormWrap autoComplete="off" onSubmit={onSubmit}>
      {/* input */}
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

      <Button type="submit" size="full" color="#3884fd">
        가입하기
      </Button>
    </SignFormWrap>
  );
};

export default SignForm;
