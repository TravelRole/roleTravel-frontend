import React, { useCallback, useState } from "react";
import styled from "styled-components";
import SearchId from "./layout/SearchId/SearchId";
import SearchPw from "./layout/SearchPw";

const SearchWrap = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SearchContainer = styled.div`
  width: 600px;

  ul {
    width: 100%;
    display: flex;
    margin-bottom: 50px;
  }
`;

const SearchTab = styled.li`
  width: 50%;
  text-align: center;
  background-color: ${(props) => props.backgroundColor};
  padding: 20px 0;
  color: ${(props) => props.color};
  cursor: pointer;
`;

const SearchIdPw = () => {
  const [currentSearch, setCurrentSearch] = useState("id");

  const onClickSearchTab = useCallback((e) => {
    setCurrentSearch(e.target.id);
  }, []);

  return (
    <SearchWrap>
      <SearchContainer>
        <ul onClick={onClickSearchTab}>
          <SearchTab
            id="id"
            color={currentSearch === "id" ? "#fff" : "black"}
            backgroundColor={currentSearch === "id" ? "#3884fd" : "#fff"}
          >
            아이디 찾기
          </SearchTab>
          <SearchTab
            id="pw"
            color={currentSearch === "pw" ? "#fff" : "black"}
            backgroundColor={currentSearch === "pw" ? "#3884fd" : "#fff"}
          >
            비밀번호 찾기
          </SearchTab>
        </ul>
        {currentSearch === "id" ? <SearchId /> : <SearchPw />}
      </SearchContainer>
    </SearchWrap>
  );
};

export default SearchIdPw;
