import React, { useCallback, useMemo, useRef } from "react";
import styled from "styled-components";
import { debounce } from "underscore";

const EMAIL_REGEX = new RegExp(
  "^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(.[0-9a-zA-Z_-]+){1,2}$"
);
const PW_REGEX = new RegExp("^[a-zA-Z0-9]{8,16}$");

const ERROR_MSG = {
  required: "* 필수 정보입니다.",
  invalidId: "이메일 형식이 아닙니다.",
  duplicateId: "이미 존재하는 이메일(아이디)입니다.",
  confirmId: "사용 가능한 아이디입니다.",
  invalidPw: "사용 불가(안전도 등급 매우 약함)",
  confirmPw: "사용 가능(안전도 등급 높음)",
  notSamePw: "비밀번호가 올바르지 않습니다.",
};

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

  const onChangeInput = useMemo(
    () =>
      debounce((e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      }, 400),
    [formData, setFormData]
  );

  const checkRegex = useCallback(
    (name) => {
      let result;
      const value = formData[name];
      // value = errorData <- store의 값으로 변경 예정
      if (value.length === 0) {
        result = "required";
      } else {
        switch (name) {
          case "email":
            result = EMAIL_REGEX.test(value) ? true : "invalidId";
            // 아이디 중복 검사 api 보류
            break;
          case "password":
            result = PW_REGEX.test(value) ? "confirmPw" : "invalidPw";
            if (result === "confirmPw") {
              messageRef.current.style.color = "blue";
            } else {
              messageRef.current.style.color = "red";
            } // code 개선 필요..

            break;
          case "confirmPassword":
            result =
              formData.password === formData.confirmPassword
                ? true
                : "notSamePw";
            break;
          default:
            result = true;
        }
      }
      // 유효성 검사에 대한 정확한 틀이 나오면 그 때 수정함.
      setErrorData((prev) => ({ ...prev, [name]: result }));
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
        onBlur={() => checkRegex(name)}
        {...inputProps}
      />
      <Message ref={messageRef}>
        {errorData[name] !== true ? ERROR_MSG[errorData[name]] : ""}
      </Message>
    </InputWrap>
  );
};

export default SignInput;
