import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Button from "../../../../components/Button";
import SearchAuthTab from "../common/SearchAuthTab";
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
  const [searchAuth, setSearchAuth] = useState("email-search");
  const [searchEmailData, setSearchEmailData] = useState({
    name: "",
    email: "",
  });
  const [searchPhoneData, setSearchPhoneData] = useState({
    name: "",
    phone: "",
  });

  const onSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      // 이메일 주소의 존재 여부를 확인해야함.
      if (searchAuth === "email-search") {
        if (emailRegex.test(searchEmailData.email)) {
          window.alert("찾으시는 아이디는 ''입니다.");
        } else {
          return;
        }
        // 휴대폰번호의 존재 여부를 확인해야함.
      } else {
        if (phoneRegex.test(searchPhoneData.phone)) {
          window.alert("찾으시는 아이디는 ''입니다.");
        } else {
          window.alert("일치하는 아이디가 없습니다.");
          return;
        }
      }
      console.log(searchEmailData, searchPhoneData);
    },
    [searchAuth, searchEmailData, searchPhoneData]
  );
  return (
    <SearchIdWrap>
      <dl>
        <dt>회원정보 입력</dt>
        <dd>가입 시 입력한 본인정보를 입력해주세요.</dd>
      </dl>
      <div>
        <SearchAuthTab setSearchAuth={setSearchAuth} searchAuth={searchAuth} />
        <form onSubmit={onSearchSubmit}>
          <SearchIdForm
            searchAuth={searchAuth}
            setSearchEmailData={setSearchEmailData}
            setSearchPhoneData={setSearchPhoneData}
          />
          <Button type="submit" size="medium" margin="0 auto" color="#3884fd">
            아이디 찾기
          </Button>
        </form>
      </div>
    </SearchIdWrap>
  );
};

export default SearchId;
