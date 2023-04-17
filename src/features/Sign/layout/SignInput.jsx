import axios from "axios";
import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import useAddSlash from "../../../lib/useAddSlash";
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
import { authApi } from "../../../lib/customAPI";

// 유효성검사
const EMAIL_REGEX = new RegExp(
  "^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(.[0-9a-zA-Z_-]+){1,2}$"
);
const PW_REGEX = new RegExp("^[a-zA-Z0-9-_!]{8,16}$");
const BIRTHDAY_REGEX = /^\d{4}\/\d{2}\/\d{2}$/;

// 유효성 검사에 맞는 에러메세지 데이터들
const ERROR_MSG = {
  required: "* 필수 정보입니다.",
  invalidId: "* 올바른 이메일 형식이 아닙니다.",
  duplicateId: "* 이미 존재하는 이메일(아이디)입니다.",
  invalidPw:
    "* 8~16자의 영문 대소문자, 숫자, 특수문자((!),(_),(-))를 사용해주세요.",
  invalidBirth: "* 생년월일이 올바르지 않습니다.",
};

const CONFIRM_MSG = {
  confirmId: "* 사용 가능한 아이디입니다.",
  confirmPw: "* 사용 가능한 비밀번호입니다. (안전도 등급 높음)",
};

const SignInput = ({
  errorData,
  setErrorData,
  name,
  label,
  formData,
  setFormData,
  inputProps,
}) => {
  const inputRef = useRef(null);
  const addSlash = useAddSlash();
  const [showPassword, setShowPassword] = useState(false);
  const [successData, setSuccessData] = useState({
    email: "",
    password: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
            } else {
              setFormData((prev) => ({ ...prev, password: "" }));
              result = "invalidPw";
            }

            break;
          case "birth":
            const newValue = addSlash(value);
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
      setSuccessData((prev) => ({ ...prev, [name]: result }));
      setErrorData((prev) => ({ ...prev, [name]: result }));
    },
    [addSlash, setErrorData, setFormData]
  );

  const checkRegex = useCallback(
    async (e) => {
      let result;

      if (e.target.name === "email" && formData.email.length > 0) {
        await authApi
          .post("auth/confirm-id", { email: formData.email })
          .then((res) => {
            if (res.data.isExist === true) {
              result = "duplicateId";
              return;
            }
            result = "confirmId";
          })
          .catch((error) => {
            if (error.response?.status === 400) {
              result = "invalidId";
              return;
            }
          });
        setSuccessData((prev) => ({ ...prev, email: result }));
        setErrorData((prev) => ({ ...prev, email: result }));
        return;
      }
      return;
    },
    [formData, setErrorData]
  );

  return (
    <FormControl variant="outlined">
      <InputLabel
        error={errorData[name] && ERROR_MSG[errorData[name]] ? true : false}
        sx={{ fontSize: "1.5rem" }}
      >
        {label}
      </InputLabel>

      <OutlinedInput
        inputRef={inputRef}
        label={label}
        error={
          errorData[name] && ERROR_MSG[errorData[name]]
            ? successData[name] && CONFIRM_MSG[successData[name]]
              ? false
              : true
            : false
        }
        name={name}
        required
        onChange={onChangeInput}
        onBlur={checkRegex}
        sx={{ borderRadius: "0.8rem" }}
        type={showPassword ? "text" : "password"}
        endAdornment={
          name === "password" && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size="medium"
              >
                {showPassword ? (
                  <VisibilityOff sx={{ fontSize: 24 }} />
                ) : (
                  <Visibility sx={{ fontSize: 24 }} />
                )}
              </IconButton>
            </InputAdornment>
          )
        }
        {...inputProps}
      />
      <FormHelperText
        sx={{
          fontSize: "1.3rem",
          color:
            (errorData[name] === "confirmPw" ||
              errorData[name] === "confirmId") &&
            "#3884fd !important",
        }}
        error={errorData[name] && ERROR_MSG[errorData[name]] ? true : false}
      >
        {ERROR_MSG[errorData[name]]
          ? ERROR_MSG[errorData[name]]
          : CONFIRM_MSG[successData[name]]}
      </FormHelperText>
    </FormControl>
  );
};

export default SignInput;
