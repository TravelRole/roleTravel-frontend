import React, { useState } from "react";
import styled from "styled-components";
import SearchAuthTab from "../SearchAuthTab";
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

    button {
      width: 30%;
      margin: 0 auto;
      padding: 15px 0;
      border: none;
      background-color: #3884fd;
      color: #fff;
      text-align: center;
      cursor: pointer;
    }
  }
`;

const SearchId = () => {
  const [searchAuth, setSearchAuth] = useState("email-search");

  return (
    <SearchIdWrap>
      <dl>
        <dt>회원정보 입력</dt>
        <dd>가입 시 입력한 본인정보를 입력해주세요.</dd>
      </dl>
      <div>
        <SearchAuthTab setSearchAuth={setSearchAuth} />
        <form>
          <SearchIdForm searchAuth={searchAuth} />
          <button type="submit">아이디 찾기</button>
        </form>
      </div>
    </SearchIdWrap>
  );
};

export default SearchId;
