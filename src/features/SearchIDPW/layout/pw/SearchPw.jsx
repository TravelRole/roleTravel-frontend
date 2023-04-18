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

const SearchPw = ({ value, index }) => {
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
    <SearchPwWrap
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      <form onSubmit={onSearchSubmit}>
        <SearchPwForm setSearchPwData={setSearchPwData} />
        <Button type="submit" size="full" color="blue" margin={"0 auto"}>
          비밀번호 찾기
        </Button>
      </form>
    </SearchPwWrap>
  );
};

export default SearchPw;
