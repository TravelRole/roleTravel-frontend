import React from "react";
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

const SearchIdForm = ({ searchAuth }) => {
  return (
    <SearchIdFormTable>
      <tbody>
        <tr>
          <td>아이디</td>
          <th>
            <input type="text" />
          </th>
        </tr>
        <tr>
          <td>
            {searchAuth === "email-search" ? "이메일 주소" : "휴대폰 번호"}
          </td>
          <th>
            {searchAuth === "email-search" ? (
              <input type="email" />
            ) : (
              <input type="text" />
            )}
          </th>
        </tr>
      </tbody>
    </SearchIdFormTable>
  );
};

export default SearchIdForm;
