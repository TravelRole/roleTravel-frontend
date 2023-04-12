import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import useAddSlash from "../../../../lib/useAddSlash";
import { TextField } from "@mui/material";

const SearchPwFormTable = styled.table`
  margin: 3rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  div.css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root {
    border-radius: 0.8rem;
  }
  label {
    font-size: 1.5rem;
  }

  input {
    font-size: 1.6rem;
  }
`;

const SearchPwForm = ({ setSearchPwData }) => {
  const inputRef = useRef(null);
  const addSlash = useAddSlash();
  const onChangeInput = useCallback(
    (e) => {
      const { name, value } = e.target;
      switch (name) {
        case "email":
          setSearchPwData((prev) => ({ ...prev, email: value }));
          break;
        case "name":
          setSearchPwData((prev) => ({ ...prev, name: value }));
          break;
        case "birth":
          const newValue = addSlash(value);
          inputRef.current.value = newValue;
          setSearchPwData((prev) => ({ ...prev, birth: newValue }));
          break;
        default:
          return;
      }
    },
    [addSlash, setSearchPwData]
  );

  return (
    <SearchPwFormTable>
      <TextField
        label="이름"
        name="name"
        required
        onChange={onChangeInput}
        placeholder="이름을 입력해주세요."
      />
      <TextField
        inputRef={inputRef}
        label="생년월일"
        name="birth"
        required
        onChange={onChangeInput}
        placeholder="생년월일을 입력해주세요. (YYYY/MM/DD)"
      />
      <TextField
        label="이메일(아이디)"
        type="email"
        name="password"
        required
        onChange={onChangeInput}
        placeholder="이메일(아이디)를 입력해주세요."
      />
    </SearchPwFormTable>
  );
};

export default SearchPwForm;
