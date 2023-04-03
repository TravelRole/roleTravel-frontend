import React, { useCallback, useEffect, useState } from "react";
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

// 유효성 검사

const SearchIdForm = ({ searchAuth, setSearchEmailData }) => {
  const onChangeInput = useCallback(
    (e) => {
      switch (e.target.id) {
        case "name":
          setSearchEmailData((prev) => ({ ...prev, name: e.target.value }));
          break;

        case "email":
          setSearchEmailData((prev) => ({ ...prev, email: e.target.value }));
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
          <td>이메일주소</td>
          <th>
            <input type="email" id="email" onChange={onChangeInput} />
          </th>
        </tr>
      </tbody>
    </SearchIdFormTable>
  );
};

export default SearchIdForm;
