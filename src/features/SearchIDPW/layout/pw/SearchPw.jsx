import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Button from "../../../../components/Button";
import SearchPwForm from "./SearchPwForm";

const SearchPwWrap = styled.section`
  form {
    display: flex;
    flex-direction: column;
  }
`;

// 이메일 유효성 검사
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SearchPw = () => {
  const [searchEmailData, setSearchEmailData] = useState({
    id: "",
    name: "",
    email: "",
    authNum: "",
  });

  const onSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (emailRegex.test(searchEmailData.email)) {
        window.alert("찾으시는 아이디는 ''입니다.");
      }
    },
    [searchEmailData.email]
  );

  return (
    <SearchPwWrap>
      <form onSubmit={onSearchSubmit}>
        <SearchPwForm setSearchEmailData={setSearchEmailData} />
        <Button type="submit" size="medium" color={"#3884fd"} margin={"0 auto"}>
          비밀번호 찾기
        </Button>
      </form>
    </SearchPwWrap>
  );
};

export default SearchPw;
