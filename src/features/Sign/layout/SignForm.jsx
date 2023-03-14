import React from "react";
import styled from "styled-components";

// 중복 컴포넌트
const InfoButton = styled.button`
  border: 1px solid #ddd;
  background-color: #eee;
  cursor: pointer;
`;

const CheckBox = styled.input`
  appearance: none;
  border: 1px solid #ddd;
  width: 1.5rem;
  height: 1.5rem;

  &:checked {
    background-image: url("data:image/svg+xml,%3Csvg width='30' height='25' viewBox='0 0 30 25' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 13.2245L9.78751 22.6089C10.1572 23.0544 10.7783 23.0544 11.148 22.6089L28.25 2' stroke='%233884FD' stroke-width='3' stroke-linecap='round'/%3E%3C/svg%3E");
    background-size: 80% 80%;
    background-position: 50%;
    background-repeat: no-repeat;
  }
`;

// 컨테이너 컴포넌트

const SignFormWrap = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;

  .sign-confirm-btn {
    padding: 20px 0;
    font-size: 1.3rem;
    border: none;
    background-color: #3884fd;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
  }
`;

const SignUserInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  input {
    padding: 15px 20px;
    border: 1px solid #ddd;
    outline: none;
  }

  .user-birth {
    width: 100%;
    gap: 10px;
    display: flex;
    justify-content: space-between;
    input {
      width: 33%;
    }
  }

  .user-phone {
    display: flex;

    input {
      width: 70%;
    }
    button {
      width: 30%;
    }
  }

  .user-auth {
    display: flex;

    input {
      width: 50%;
    }

    .auth-confirm {
      margin-right: 10px;
      width: 20%;
    }

    .auth-resend {
      width: 30%;
    }
  }
`;

const SignCheckBoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;

  .all-check {
    margin-bottom: 30px;
  }

  .each-check {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;

const CheckWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  label {
    width: 95%;
  }
`;

const SignRadioBoxWrap = styled.div`
  margin-top: 50px;
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

const SignForm = () => {
  return (
    <SignFormWrap>
      <SignUserInfo>
        <input type="text" placeholder="* 이름(실명)" required />
        <div className="user-birth">
          <input type="text" placeholder="* 생년월일/YYYY" required />
          <input type="text" placeholder="* MM" required />
          <input type="text" placeholder="* DD" required />
        </div>
        <input type="text" placeholder="* 아이디" required />
        <input
          type="password"
          placeholder="* 비밀번호 (8~16자의 영문, 숫자, 특수기호)"
        />
        <input type="email" placeholder="* 이메일" required />
        <div className="user-phone">
          <input type="text" placeholder="* 휴대폰 번호" required />
          <InfoButton>인증번호 전송</InfoButton>
        </div>
        <div className="user-auth">
          <input type="text" placeholder="* 인증번호 입력" required />
          <InfoButton className="auth-confirm">확인</InfoButton>
          <InfoButton className="auth-resend">재전송</InfoButton>
        </div>
      </SignUserInfo>

      <SignCheckBoxWrap>
        <div className="all-check">
          <CheckWrap>
            <label htmlFor="all-checkbox">
              필수동의 항목 및 개인정보 수집 및 이용 동의(선택), 광고성 정보
              수신(선택) 에 모두 동의합니다.
            </label>
            <CheckBox type="checkbox" id="all-checkbox" />
          </CheckWrap>
        </div>

        <div className="each-check">
          <CheckWrap>
            <label htmlFor="check1">
              <span>[필수]</span> 이용 약관 동의
            </label>
            <CheckBox type="checkbox" id="check1" required />
          </CheckWrap>
          <CheckWrap>
            <label htmlFor="check2">
              <span>[필수]</span> 개인정보 수집 및 이용 동의
            </label>
            <CheckBox type="checkbox" id="check2" required />
          </CheckWrap>
          <CheckWrap>
            <label htmlFor="check3">[선택] 광고성 정보 이메일 수신 동의</label>
            <CheckBox type="checkbox" id="check3" required />
          </CheckWrap>
          <CheckWrap>
            <label htmlFor="check4">[선택] 광고성 정보 SMS 수신 동의</label>
            <CheckBox type="checkbox" id="check4" required />
          </CheckWrap>
        </div>
        <SignRadioBoxWrap>
          <p>
            <span>*</span> 개인정보 유효기간 선택
          </p>

          <div className="radio-container">
            <RadioWrap>
              <input
                type="radio"
                id="radio1"
                name="userInfoCheck"
                value="oneYear"
              />
              <label htmlFor="radio1">1년</label>
            </RadioWrap>
            <RadioWrap>
              <input
                type="radio"
                id="radio2"
                name="userInfoCheck"
                value="threeYear"
              />
              <label htmlFor="radio2">3년</label>
            </RadioWrap>
            <RadioWrap>
              <input
                type="radio"
                id="radio3"
                name="userInfoCheck"
                value="infoQuit"
              />
              <label htmlFor="radio3">회원탈퇴시</label>
            </RadioWrap>
          </div>
        </SignRadioBoxWrap>
      </SignCheckBoxWrap>
      <button type="submit" className="sign-confirm-btn">
        가입하기
      </button>
    </SignFormWrap>
  );
};

export default SignForm;
