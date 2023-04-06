import React, { useCallback, useState } from "react";
import styled from "styled-components";
import useAddSlash from "../../../../lib/useAddSlash";

const SearchPwFormTable = styled.table`
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

const SearchPwForm = ({ setSearchPwData }) => {
  const [birth, setBirth] = useState("");
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
          setBirth(newValue);
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
      <tbody>
        <tr>
          <td>이메일</td>
          <th>
            <input type="text" name="email" onChange={onChangeInput} />
          </th>
        </tr>
        <tr>
          <td>이름</td>
          <th>
            <input type="text" name="name" onChange={onChangeInput} />
          </th>
        </tr>
        <tr>
          <td>생년월일</td>
          <th>
            <input
              type="text"
              name="birth"
              onChange={onChangeInput}
              value={birth}
            />
          </th>
        </tr>
      </tbody>
    </SearchPwFormTable>
  );
};

export default SearchPwForm;
