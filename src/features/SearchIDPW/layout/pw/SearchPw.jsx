import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Button from "../../../../components/Button";
import SearchAuthTab from "../common/SearchAuthTab";
import SearchPwForm from "./SearchPwForm";

const SearchPwWrap = styled.section`
  form {
    display: flex;
    flex-direction: column;
  }
`;

// 이메일 유효성 검사
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^01([0|1|6|7|8|9])(?:\d{3}|\d{4})\d{4}$/;

const SearchPw = () => {
  const [searchAuth, setSearchAuth] = useState("email-search");
  const [searchEmailData, setSearchEmailData] = useState({
    id: "",
    name: "",
    email: "",
    authNum: "",
  });
  const [searchPhoneData, setSearchPhoneData] = useState({
    id: "",
    name: "",
    phone: "",
    authNum: "",
  });

  const onSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (searchAuth === "email-search") {
        // 이메일 주소의 존재 여부를 확인해야함.
        if (emailRegex.test(searchEmailData.email)) {
          window.alert("찾으시는 아이디는 ''입니다.");
        } else {
          return;
        }
      } else {
        // 휴대폰번호의 존재 여부를 확인해야함.
        if (phoneRegex.test(searchPhoneData.phone)) {
          window.alert("찾으시는 아이디는 ''입니다.");
        } else {
          window.alert("일치하는 아이디가 없습니다.");
          return;
        }
      }
    },
    [searchAuth, searchEmailData.email, searchPhoneData.phone]
  );

  return (
    <SearchPwWrap>
      <SearchAuthTab setSearchAuth={setSearchAuth} searchAuth={searchAuth} />
      <form onSubmit={onSearchSubmit}>
        <SearchPwForm
          searchAuth={searchAuth}
          setSearchEmailData={setSearchEmailData}
          setSearchPhoneData={setSearchPhoneData}
        />
        <Button
          type="submit"
          width={"30%"}
          border={"none"}
          color={"#3884fd"}
          fontColor={"#fff"}
          margin={"0 auto"}
        >
          비밀번호 찾기
        </Button>
      </form>
    </SearchPwWrap>
  );
};

export default SearchPw;
