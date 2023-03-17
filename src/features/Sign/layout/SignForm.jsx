import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "../../../components/Button";
import RadioButton from "../../../components/RadioButton";
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

  .user-phone {
    width: 100%;
    display: flex;
    button {
      width: 30%;
    }
  }

  .user-auth {
    display: flex;

    .auth-confirm {
      margin-right: 10px;
      width: 20%;
    }

    .auth-resend {
      width: 30%;
    }
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
  name: "",
  id: "",
  pw: "",
  confirmPw: "",
  isNotError: false,
};

const SignForm = () => {
  const [errorData, setErrorData] = useState(initialMessage);
  const dispatch = useDispatch();

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    // dispatch(join)
  }, []);

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
            placeholder: "* 이름(실명)",
            width: "100%",
          }}
          id={"name"}
          errorData={errorData}
          setErrorData={setErrorData}
        />

        <div className="user-birth">
          <SignInput
            inputProps={{
              type: "text",
              placeholder: "* 생년월일/YYYY",
              width: "33%",
            }}
            id={"y"}
            errorData={errorData}
            setErrorData={setErrorData}
          />
          <SignInput
            inputProps={{
              type: "text",
              placeholder: "* MM",
              width: "33%",
            }}
            id={"m"}
            errorData={errorData}
            setErrorData={setErrorData}
          />
          <SignInput
            inputProps={{
              type: "text",
              placeholder: "* DD",
              width: "33%",
            }}
            id={"d"}
            errorData={errorData}
            setErrorData={setErrorData}
          />
        </div>
        <SignInput
          inputProps={{
            type: "text",
            placeholder: "* 아이디",
            width: "100%",
          }}
          id={"id"}
          errorData={errorData}
          setErrorData={setErrorData}
        />
        <SignInput
          inputProps={{
            type: "password",
            placeholder: "* 비밀번호 (8~16자의 영문, 숫자, 특수기호)",
            width: "100%",
          }}
          id={"pw"}
          errorData={errorData}
          setErrorData={setErrorData}
        />
        <SignInput
          inputProps={{
            type: "email",
            placeholder: "* 이메일",
            width: "100%",
          }}
          id={"email"}
          errorData={errorData}
          setErrorData={setErrorData}
        />

        <div className="user-phone">
          <SignInput
            inputProps={{
              type: "text",
              placeholder: "* 휴대폰 번호",
              width: "70%",
            }}
            id={"phoneNumber"}
            errorData={errorData}
            setErrorData={setErrorData}
          />
          <InfoButton>인증번호 전송</InfoButton>
        </div>
        <div className="user-auth">
          <SignInput
            inputProps={{
              type: "text",
              placeholder: "* 인증번호 입력",
              width: "50%",
            }}
            id={"authNumber"}
            errorData={errorData}
            setErrorData={setErrorData}
          />
          <InfoButton className="auth-confirm">확인</InfoButton>
          <InfoButton className="auth-resend">재전송</InfoButton>
        </div>
      </SignUserInfo>

      {/* check box section */}
      <SignCheckBox />
      <SignRadioBoxWrap>
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
      </SignRadioBoxWrap>

      <Button type="submit" size="full" color="#3884fd">
        가입하기
      </Button>
    </SignFormWrap>
  );
};

export default SignForm;
