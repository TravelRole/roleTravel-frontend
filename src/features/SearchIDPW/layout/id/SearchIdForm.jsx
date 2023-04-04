import React, { useCallback, useState } from "react";
import styled from "styled-components";

const SearchIdFormTable = styled.table`
  margin: 30px 0;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
  tbody {
    tr {
      td {
        width: 20%;
      }
      th {
        width: 80%;
        input {
          width: 100%;
          padding: 10px;
          box-sizing: border-box;
          border: 1px solid #ddd;
          outline: none;
        }
      }
    }
  }
`;

// slash 자동 추가
const addSlash = (value) => {
  value = value.replace(/\//g, "");
  const regex = /(\d{1,4})(\d{1,2})?(\d{1,2})?/;
  const groups = value.match(regex);
  if (groups) {
    value = groups
      .slice(1)
      .filter((group) => !!group)
      .join("/");
  }
  return value;
};

const SearchIdForm = ({ searchAuth, setSearchEmailData }) => {
  const [birth, setBirth] = useState("");
  const onChangeInput = useCallback(
    (e) => {
      const { value, id } = e.target;
      switch (id) {
        case "name":
          setSearchEmailData((prev) => ({ ...prev, name: value }));
          break;

        case "birth":
          const newValue = addSlash(value);
          setBirth(newValue);
          setSearchEmailData((prev) => ({ ...prev, birth: value }));
          break;
        default:
          return;
      }
    },

    [setSearchEmailData]
  );

  return (
    <SearchIdFormTable>
      <tbody>
        <tr>
          <td>이름</td>
          <th>
            <input type="text" id="name" onChange={onChangeInput} required />
          </th>
        </tr>
        <tr>
          <td>생년월일</td>
          <th>
            <input
              type="text"
              id="birth"
              onChange={onChangeInput}
              value={birth}
            />
          </th>
        </tr>
      </tbody>
    </SearchIdFormTable>
  );
};

export default SearchIdForm;
