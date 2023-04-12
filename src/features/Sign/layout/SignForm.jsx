import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../components/Button";
import { signUp } from "../signSlice";
import SignInput from "./SignInput";
import SignModal from "./SignModal";

// 컨테이너 컴포넌트

const SignFormWrap = styled.form`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
`;

const SignUserInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  div.MuiFormControl-root {
    label {
      font-size: 1.5rem;
    }
    div.MuiInputBase-root {
      border-radius: 0.8rem;
      input {
        font-size: 1.6rem;
        border-radius: 0.8rem;
      }
    }
  }

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
    gap: 1rem;
    align-items: center;

    input {
      appearance: none;
      border-radius: 50%;
      background-color: #d9d9d9;
      background-image: url("data:image/svg+xml,%3Csvg width='14' height='9' viewBox='0 0 14 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.78247 4.27374L5.4121 7.89268L12.2177 1.10718' stroke='%23F5F5F5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-size: 80% 80%;
      background-position: 50%;
      background-repeat: no-repeat;
      width: 2.1rem;
      height: 2.1rem;
      cursor: pointer;

      &:checked {
        background-color: #3884fd;
        background-image: url("data:image/svg+xml,%3Csvg width='14' height='9' viewBox='0 0 14 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.78247 4.27374L5.4121 7.89268L12.2177 1.10718' stroke='%23F5F5F5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        background-size: 80% 80%;
        background-position: 50%;
        background-repeat: no-repeat;
      }
    }

    label {
      font-size: 1.5rem;
      color: #4a4a4a;
    }
  }

  p {
    font-size: 1.5rem;
    color: #3884fd;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const ToLoginText = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  text-align: center;
  color: #9e9e9e;
  margin-top: 1.5rem;
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
    signUpDate: null,
  });

  const [check, setCheck] = useState(false);

  const [formOk, setFormOk] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setFormData((prev) => ({ ...prev, signUpDate: new Date() }));
      dispatch(signUp(formData));
    },
    [dispatch, formData]
  );

  // formData의 데이터가 없거나, check가 안된 상황이라면 submit 버튼을 막아놓음.
  useEffect(() => {
    if (
      formData.name.length === 0 ||
      formData.birth.length === 0 ||
      formData.email.length === 0 ||
      formData.password.length === 0 ||
      check === false
    ) {
      setFormOk(true);
      return;
    } else {
      setFormOk(false);
    }
  }, [
    check,
    formData.birth.length,
    formData.email.length,
    formData.name.length,
    formData.password.length,
  ]);

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
            label={"이름"}
            name={"name"}
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
            label={"생년월일"}
            name={"birth"}
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
            label={"이메일(아이디)"}
            name={"email"}
            errorData={errorData}
            setErrorData={setErrorData}
            setFormData={setFormData}
            formData={formData}
          />
          <SignInput
            inputProps={{
              placeholder: "비밀번호를 입력해주세요.",
              width: "100%",
            }}
            label={"비밀번호"}
            name={"password"}
            errorData={errorData}
            setErrorData={setErrorData}
            setFormData={setFormData}
            formData={formData}
          />
        </SignUserInfo>

        <CheckBoxWrap>
          <div>
            <input
              type="checkbox"
              name="termsUse"
              required={true}
              onChange={(e) => {
                setCheck(e.target.checked);
              }}
            />
            <label>[필수] 이용약관 및 개인정보 수집 동의</label>
          </div>
          <p onClick={() => setOpenModal((prev) => !prev)}>내용 보기</p>
        </CheckBoxWrap>

        <Button type="submit" size="full" color="blue" disabled={formOk}>
          가입하기
        </Button>
      </SignFormWrap>
      <ToLoginText>
        이미 계정이 있으신가요?
        <Link
          to="/login"
          style={{
            fontSize: "1.5rem",
            fontWeight: "400",
            color: "#3884fd",
            textDecoration: "underline",
          }}
        >
          로그인
        </Link>
      </ToLoginText>
      {openModal && <SignModal setOpenModal={setOpenModal} />}
    </>
  );
};

export default SignForm;
