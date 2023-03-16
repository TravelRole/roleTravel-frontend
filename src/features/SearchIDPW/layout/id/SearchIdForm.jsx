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

const SearchIdForm = ({
  searchAuth,
  setSearchEmailData,
  setSearchPhoneData,
}) => {
  const [currentData, setCurrentData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // 이메일 인증 <-> 휴대폰 인증으로 이동할 때 input 값 초기화
  useEffect(() => {
    setCurrentData({ name: "", email: "", phone: "" });
  }, [searchAuth]);

  const onChangeInput = useCallback(
    (e) => {
      switch (e.target.id) {
        case "name":
          setCurrentData((prev) => ({ ...prev, name: e.target.value }));
          if (searchAuth === "email-search") {
            setSearchEmailData((prev) => ({ ...prev, name: e.target.value }));
            return;
          } else {
            setSearchPhoneData((prev) => ({ ...prev, name: e.target.value }));
          }
          break;

        case "email":
          setCurrentData((prev) => ({ ...prev, email: e.target.value }));
          setSearchEmailData((prev) => ({ ...prev, email: e.target.value }));
          break;
        case "phone":
          setCurrentData((prev) => ({ ...prev, phone: e.target.value }));
          setSearchPhoneData((prev) => ({ ...prev, phone: e.target.value }));
          break;
        default:
          return;
      }
    },

    [searchAuth, setSearchEmailData, setSearchPhoneData]
  );

  return (
    <SearchIdFormTable>
      <tbody>
        <tr>
          <td>이름</td>
          <th>
            <input
              type="text"
              id="name"
              onChange={onChangeInput}
              value={currentData.name}
              required
            />
          </th>
        </tr>
        <tr>
          <td>
            {searchAuth === "email-search" ? "이메일 주소" : "휴대폰 번호"}
          </td>
          <th>
            {searchAuth === "email-search" ? (
              <input
                type="email"
                id="email"
                onChange={onChangeInput}
                value={currentData.email}
              />
            ) : (
              <input
                type="text"
                id="phone"
                onChange={onChangeInput}
                value={currentData.phone}
              />
            )}
          </th>
        </tr>
      </tbody>
    </SearchIdFormTable>
  );
};

export default SearchIdForm;
