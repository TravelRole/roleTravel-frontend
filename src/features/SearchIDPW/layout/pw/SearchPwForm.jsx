import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "../../../../components/Button";

const SearchPwFormTable = styled.table`
  margin: 30px 0;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
  tbody {
    tr {
      td {
        width: 20%;
      }
      th {
        width: 80%;
        input {
          width: 100%;
          padding: 10px;
          box-sizing: border-box;
          border: 1px solid #ddd;
          outline: none;
        }
      }
    }
  }
`;

const InputBox = styled.div`
  display: flex;
  gap: 10px;
  input {
    flex: 1;
  }
  button {
    flex: 0.5;
  }
`;

const SearchPwForm = ({
  searchAuth,
  setSearchEmailData,
  setSearchPhoneData,
}) => {
  const [currentData, setCurrentData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    authNum: "",
  });

  useEffect(() => {
    setCurrentData({ id: "", name: "", email: "", phone: "", authNum: "" });
  }, [searchAuth]);

  const onChangeInput = useCallback(
    (e) => {
      switch (e.target.id) {
        case "id":
          setCurrentData((prev) => ({ ...prev, id: e.target.value }));
          if (searchAuth === "email-search") {
            setSearchEmailData((prev) => ({ ...prev, id: e.target.value }));
            return;
          } else {
            setSearchPhoneData((prev) => ({ ...prev, id: e.target.value }));
          }
          break;
        case "name":
          setCurrentData((prev) => ({ ...prev, name: e.target.value }));
          if (searchAuth === "email-search") {
            setSearchEmailData((prev) => ({ ...prev, name: e.target.value }));
            return;
          } else {
            setSearchPhoneData((prev) => ({ ...prev, name: e.target.value }));
          }
          break;
        case "authNumber":
          setCurrentData((prev) => ({ ...prev, authNum: e.target.value }));
          if (searchAuth === "email-search") {
            setSearchEmailData((prev) => ({
              ...prev,
              authNum: e.target.value,
            }));
            return;
          } else {
            setSearchPhoneData((prev) => ({
              ...prev,
              authNum: e.target.value,
            }));
          }
          break;
        case "email":
          setCurrentData((prev) => ({ ...prev, email: e.target.value }));
          setSearchEmailData((prev) => ({ ...prev, email: e.target.value }));
          break;
        case "phone":
          setCurrentData((prev) => ({ ...prev, phone: e.target.value }));
          setSearchPhoneData((prev) => ({ ...prev, phone: e.target.value }));
          break;
        default:
          return;
      }
    },
    [searchAuth, setSearchEmailData, setSearchPhoneData]
  );
  // 유효성 검사
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^01([0|1|6|7|8|9])(?:\d{3}|\d{4})\d{4}$/;

  // 임시로 윈도우 알림창으로 4자리 숫자를 발급 받을 수 있도록 함.
  const getAuthNumber = useCallback(() => {
    const randomAuthNub = Math.floor(1000 + Math.random() * 9000);
    // 이메일 주소가 정확하게 쓰여졌다면 발급 받을 수 있도록 함.
    // 유효성 검사를 실시함.
    if (searchAuth === "email-search") {
      if (currentData.email.length > 0) {
        if (emailRegex.test(currentData.email)) {
          window.alert(`이메일 인증 번호는 ${randomAuthNub} 입니다`);
          return;
        }
        window.alert("이메일 형식이 아닙니다.");
        return;
      } else {
        window.alert("이메일을 입력해주세요.");
        return;
      }
    } else {
      if (currentData.phone.length > 0) {
        if (phoneRegex.test(currentData.phone)) {
          window.alert(`휴대폰 인증 번호는 ${randomAuthNub} 입니다`);
          return;
        }
        window.alert("휴대폰 번호 형식이 아닙니다.");
        return;
      } else {
        window.alert("휴대폰 번호를 입력해주세요.");
        return;
      }
    }
  }, [
    currentData.email,
    currentData.phone,
    emailRegex,
    phoneRegex,
    searchAuth,
  ]);

  return (
    <SearchPwFormTable>
      <tbody>
        <tr>
          <td>아이디</td>
          <th>
            <input
              type="text"
              id="id"
              value={currentData.id}
              onChange={onChangeInput}
            />
          </th>
        </tr>
        <tr>
          <td>이름</td>
          <th>
            <input
              type="text"
              id="name"
              value={currentData.name}
              onChange={onChangeInput}
            />
          </th>
        </tr>
        <tr>
          <td>
            {searchAuth === "email-search" ? "이메일 주소" : "휴대폰 번호"}
          </td>
          <th>
            {searchAuth === "email-search" ? (
              <InputBox>
                <input
                  type="email"
                  id="email"
                  value={currentData.email}
                  onChange={onChangeInput}
                />
                <Button type="button" color="#ddd" onClick={getAuthNumber}>
                  인증번호 전송
                </Button>
              </InputBox>
            ) : (
              <InputBox>
                <input
                  type="text"
                  id="phone"
                  value={currentData.phone}
                  onChange={onChangeInput}
                />
                <Button
                  type="button"
                  border={"none"}
                  color={"#ddd"}
                  fontColor={"#555"}
                  onClick={getAuthNumber}
                >
                  인증번호 전송
                </Button>
              </InputBox>
            )}
          </th>
        </tr>
        <tr>
          <td>인증번호 입력</td>
          <th>
            <input
              type="text"
              id="authNumber"
              value={currentData.authNum}
              onChange={onChangeInput}
            />
          </th>
        </tr>
      </tbody>
    </SearchPwFormTable>
  );
};

export default SearchPwForm;
