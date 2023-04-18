import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import useAddSlash from "../../../../lib/useAddSlash";
import { TextField } from "@mui/material";

const SearchIdFormTable = styled.table`
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

const SearchIdForm = ({ setSearchEmailData }) => {
  const inputRef = useRef(null);
  const addSlash = useAddSlash();
  const onChangeInput = useCallback(
    (e) => {
      const { value, name } = e.target;
      switch (name) {
        case "name":
          setSearchEmailData((prev) => ({ ...prev, name: value }));
          break;

        case "birth":
          const newValue = addSlash(value);
          inputRef.current.value = newValue;
          setSearchEmailData((prev) => ({ ...prev, birth: newValue }));
          break;
        default:
          return;
      }
    },

    [addSlash, setSearchEmailData]
  );

  return (
    <SearchIdFormTable>
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
    </SearchIdFormTable>
  );
};

export default SearchIdForm;
