import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "../../../../components/Button";
import { getUserId } from "../../searchSlice";
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

const SearchId = () => {
  const dispatch = useDispatch();
  const [searchEmailData, setSearchEmailData] = useState({
    name: "",
    birth: "",
  });

  const onSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(getUserId(searchEmailData));
    },
    [dispatch, searchEmailData]
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
