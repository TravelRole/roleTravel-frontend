import React from "react";
import styled from "styled-components";
import Icons from "../../../assets/icon/icon";

const SignModalBg = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const SignModalWrap = styled.div`
  width: 100%;
  max-width: 56rem;
  background-color: #fff;
  border-radius: 1.6rem;
  box-shadow: 0px 2rem 2rem rgba(0, 0, 0, 0.08),
    0px 0px 0.2rem rgba(0, 0, 0, 0.12);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;

  ul {
    padding: 2.5rem 2.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #333;
    li:first-child {
      font-size: 2.2rem;
    }
    li:last-child {
      width: 2.4rem;
      height: 2.4rem;
      font-size: 2.4rem;
      cursor: pointer;
    }
  }

  div.sign-text {
    border-top: 1px solid #e6e6e6;
    width: 100%;
    height: 400px;
    box-sizing: border-box;
    overflow: auto;
    display: flex;
    flex-direction: column;
    p {
      padding: 3rem 2.4rem 1.8rem 2.4rem;
      color: #707070;
      font-size: 1.6rem;
      font-weight: 400;
    }
    dl {
      margin-bottom: 3.2rem;
      padding: 0 2.4rem;
      dt {
        font-size: 1.7rem;
        font-weight: 400;
        margin-bottom: 0.8rem;
      }
      dd {
        font-size: 1.3rem;
        font-weight: 300;
        line-height: 1.8rem;
      }
    }
  }

  div.sign-modal-btn {
    display: flex;
    justify-content: flex-end;
    padding: 2.5rem 2.4rem;
    border-top: 1px solid #e6e6e6;
    button {
      padding: 1.3rem 2.6rem;
      font-weight: 600;
      font-size: 1.6rem;
      color: #fff;
      background-color: #3884fd;
      border: none;
      border-radius: 0.8rem;
      cursor: pointer;
    }
  }
`;

const SignModal = ({ setOpenModal }) => {
  const CancelIcon = Icons.HiOutlineX;
  return (
    <>
      <SignModalBg />
      <SignModalWrap>
        <ul>
          <li>개인정보 약관 및 동의 (필수)</li>
          <li onClick={() => setOpenModal((prev) => !prev)}>
            <CancelIcon />
          </li>
        </ul>
        <div className="sign-text">
          <p>개정 일자 : 2023.09.09</p>
          <dl>
            <dt>제1조 (목적)</dt>
            <dd>
              이 약관은 여행역할(이하 "사이트"라 합니다)에서 제공하는
              인터넷서비스(이하 "서비스"라 합니다)의 이용 조건 및 절차에 관한
              기본적인 사항을 규정함을 목적으로 합니다.
            </dd>
          </dl>
          <dl>
            <dt>제2조 (약관의 효력 및 변경)</dt>
            <dd>
              ① 이 약관은 서비스 화면이나 기타의 방법으로 이용고객에게
              공지함으로써 효력을 발생합니다.
            </dd>
            <dd>
              ② 사이트는 이 약관의 내용을 변경할 수 있으며, 변경된 약관은
              제1항과 같은 방법으로 공지 또는 통지함으로써 효력을 발생합니다.
            </dd>
          </dl>
          <dl>
            <dt>제3조 (용어의 정의)</dt>
            <dd>
              이 약관에서 사용하는 용어의 정의는 다음과 같습니다. ① 회원 :
              사이트와 서비스 이용계약을 체결하거나 이용자 아이디(ID)를 부여받은
              개인 또는 단체를 말합니다.
            </dd>
            <dd>② 신청자 : 회원가입을 신청하는 개인 또는 단체를 말합니다.</dd>
            <dd>
              ③ 아이디(ID) : 회원의 식별과 서비스 이용을 위하여 회원이 정하고
              사이트가 승인하는 문자와 숫자의 조합을 말합니다.
            </dd>
            <dd>
              ④ 비밀번호 : 회원이 부여 받은 아이디(ID)와 일치된 회원임을
              확인하고, 회원 자신의 비밀을 보호하기 위하여 회원이 정한 문자와
              숫자의 조합을 말합니다.
            </dd>
            <dd>
              ⑤ 해지 : 사이트 또는 회원이 서비스 이용계약을 취소하는 것을
              말합니다.
            </dd>
          </dl>
          <dl>
            <dt>제4조 (이용계약의 성립)</dt>
            <dd>
              ① 이용약관 하단의 동의 버튼을 누르면 이 약관에 동의하는 것으로
              간주됩니다.
            </dd>
            <dd>
              ② 이용계약은 서비스 이용희망자의 이용약관 동의 후 이용 신청에
              대하여 사이트가 승낙함으로써 성립합니다.
            </dd>
          </dl>
          <dl>
            <dt>제5조 (이용신청)</dt>
            <dd>
              ① 신청자가 본 서비스를 이용하기 위해서는 사이트 소정의 가입신청
              양식에서 요구하는 이용자 정보를 기록하여 제출해야 합니다.
            </dd>
            <dd>
              ② 가입신청 양식에 기재하는 모든 이용자 정보는 모두 실제 데이터인
              것으로 간주됩니다. 실명이나 실제 정보를 입력하지 않은 사용자는
              법적인 보호를 받을 수 없으며, 서비스의 제한을 받을 수 있습니다.
            </dd>
          </dl>
          <dl>
            <dt>제6조 (이용신청의 승낙)</dt>
            <dd>
              ① 사이트는 신청자에 대하여 제2항, 제3항의 경우를 예외로 하여
              서비스 이용신청을 승낙합니다.
            </dd>
            <dd>
              ② 사이트는 다음에 해당하는 경우에 그 신청에 대한 승낙 제한사유가
              해소될 때까지 승낙을 유보할 수 있습니다. 가. 서비스 관련 설비에
              여유가 없는 경우 나. 기술상 지장이 있는 경우 다. 기타 사이트가
              필요하다고 인정되는 경우
            </dd>
            <dd>
              ③ 사이트는 신청자가 다음에 해당하는 경우에는 승낙을 거부할 수
              있습니다. 가. 다른 개인(사이트)의 명의를 사용하여 신청한 경우 나.
              이용자 정보를 허위로 기재하여 신청한 경우 다. 사회의 안녕질서 또는
              미풍양속을 저해할 목적으로 신청한 경우 라. 기타 사이트 소정의
              이용신청요건을 충족하지 못하는 경우
            </dd>
          </dl>
        </div>
        <div className="sign-modal-btn">
          <button onClick={() => setOpenModal((prev) => !prev)}>확인</button>
        </div>
      </SignModalWrap>
    </>
  );
};

export default SignModal;
