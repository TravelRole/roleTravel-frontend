import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "../../../../components/Button";
import { searchUserPw } from "../../searchSlice";
import SearchPwForm from "./SearchPwForm";

const SearchPwWrap = styled.section`
  form {
    display: flex;
    flex-direction: column;
  }
`;

const SearchPw = () => {
  const [searchPwData, setSearchPwData] = useState({
    email: "",
    name: "",
    birth: "",
  });
  const dispatch = useDispatch();

  const onSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(searchUserPw(searchPwData));
    },
    [dispatch, searchPwData]
  );

  return (
    <SearchPwWrap>
      <form onSubmit={onSearchSubmit}>
        <SearchPwForm setSearchPwData={setSearchPwData} />
        <Button type="submit" size="medium" color={"#3884fd"} margin={"0 auto"}>
          비밀번호 찾기
        </Button>
      </form>
    </SearchPwWrap>
  );
};

export default SearchPw;
