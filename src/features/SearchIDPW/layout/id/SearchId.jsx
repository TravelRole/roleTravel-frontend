import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "../../../../components/Button";
import { searchUserId } from "../../searchSlice";
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

const SearchId = ({ value, index }) => {
  const dispatch = useDispatch();
  const [searchEmailData, setSearchEmailData] = useState({
    name: "",
    birth: "",
  });

  const onSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(searchUserId(searchEmailData));
    },
    [dispatch, searchEmailData]
  );
  return (
    <SearchIdWrap
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      <form onSubmit={onSearchSubmit}>
        <SearchIdForm setSearchEmailData={setSearchEmailData} />
        <Button type="submit" size="full" margin="0 auto" color="blue">
          아이디 찾기
        </Button>
      </form>
    </SearchIdWrap>
  );
};

export default SearchId;
