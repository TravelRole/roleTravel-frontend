import axios from "axios";
import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import useAddSlash from "../../../lib/useAddSlash";

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width};
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 5px;
  padding: 15px 20px;
  border: 1px solid #ddd;
  outline: none;
`;

const Message = styled.p`
  color: red;
  font-size: 0.8rem;
`;

// 유효성검사
const EMAIL_REGEX = new RegExp(
  "^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(.[0-9a-zA-Z_-]+){1,2}$"
);
const PW_REGEX = new RegExp("^[a-zA-Z0-9]{8,16}$");
const BIRTHDAY_REGEX = /^\d{4}\/\d{2}\/\d{2}$/;

// 유효성 검사에 맞는 에러메세지 데이터들
const ERROR_MSG = {
  required: "* 필수 정보입니다.",
  invalidId: "이메일 형식이 아닙니다.",
  duplicateId: "이미 존재하는 이메일(아이디)입니다.",
  confirmId: "사용 가능한 아이디입니다.",
  invalidPw: "사용 불가(안전도 등급 매우 약함)",
  confirmPw: "사용 가능(안전도 등급 높음)",
  notSamePw: "비밀번호가 올바르지 않습니다.",
  invalidBirth: "생년월일이 올바르지 않습니다.",
};

const SignInput = ({
  errorData,
  setErrorData,
  name,
  formData,
  setFormData,
  inputProps,
}) => {
  const inputRef = useRef(null);
  const messageRef = useRef(null);
  const [birth, setBirth] = useState("");
  const addSlash = useAddSlash();

  const onChangeInput = useCallback(
    (e) => {
      let result;
      const { name, value } = e.target;
      if (value.length === 0) {
        result = "required";
      } else {
        result = true;
        switch (name) {
          case "name":
            setFormData((prev) => ({ ...prev, name: value }));
            result = true;
            break;
          case "email":
            if (EMAIL_REGEX.test(value)) {
              setFormData((prev) => ({ ...prev, email: value }));
              result = true;
            } else {
              setFormData((prev) => ({ ...prev, email: "" }));
              result = "invalidId";
            }

            break;
          case "password":
            if (PW_REGEX.test(value)) {
              setFormData((prev) => ({ ...prev, password: value }));
              result = "confirmPw";
              messageRef.current.style.color = "blue";
            } else {
              setFormData((prev) => ({ ...prev, password: "" }));
              result = "invalidPw";
              messageRef.current.style.color = "red";
            }

            break;
          case "birth":
            const newValue = addSlash(value);
            setBirth(newValue);
            inputRef.current.value = newValue;
            if (BIRTHDAY_REGEX.test(newValue)) {
              setFormData((prev) => ({ ...prev, birth: newValue }));
              result = true;
            } else {
              setFormData((prev) => ({ ...prev, birth: "" }));
              result = "invalidBirth";
            }
            break;
          default:
            result = true;
            break;
        }
      }
      setErrorData((prev) => ({ ...prev, [name]: result }));
    },
    [addSlash, setErrorData, setFormData]
  );

  const checkRegex = useCallback(
    async (e) => {
      let result;

      if (e.target.name === "email" && formData.email.length > 0) {
        await axios
          .post("auth/confirm-id", { email: formData.email })
          .then((res) => {
            if (res.data.isExist === true) {
              result = "duplicateId";
              return;
            }
            result = "confirmId";
          })
          .catch((error) => {
            if (error.response.status === 400) {
              result = "invalidId";
              return;
            }
          });

        setErrorData((prev) => ({ ...prev, email: result }));
        return;
      }
      return;
    },
    [formData, setErrorData]
  );

  return (
    <InputWrap {...inputProps}>
      <Input
        ref={inputRef}
        name={name}
        required
        onChange={onChangeInput}
        onBlur={checkRegex}
        {...inputProps}
      />

      <Message ref={messageRef}>
        {errorData[name] && ERROR_MSG[errorData[name]]}
      </Message>
    </InputWrap>
  );
};

export default SignInput;
