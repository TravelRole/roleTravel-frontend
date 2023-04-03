import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Button from "../../../../components/Button";
import SearchIdForm from "./SearchIdForm";

const SearchIdWrap = styled.section`
  dl {
    margin-bottom: 30px;
    dt {
      font-size: 1.5rem;
      margin-bottom: 8px;
    }
    dd {
      font-size: 0.9rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
  }
`;

// 유효성 검사
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^01([0|1|6|7|8|9])(?:\d{3}|\d{4})\d{4}$/;

const SearchId = () => {
  const [searchEmailData, setSearchEmailData] = useState({
    name: "",
    email: "",
  });

  const onSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (emailRegex.test(searchEmailData.email)) {
        window.alert("찾으시는 아이디는 ''입니다.");
      }
    },
    [searchEmailData]
  );
  return (
    <SearchIdWrap>
      <dl>
        <dt>회원정보 입력</dt>
        <dd>가입 시 입력한 본인정보를 입력해주세요.</dd>
      </dl>
      <div>
        <form onSubmit={onSearchSubmit}>
          <SearchIdForm setSearchEmailData={setSearchEmailData} />
          <Button type="submit" size="medium" margin="0 auto" color="#3884fd">
            아이디 찾기
          </Button>
        </form>
      </div>
    </SearchIdWrap>
  );
};

export default SearchId;
