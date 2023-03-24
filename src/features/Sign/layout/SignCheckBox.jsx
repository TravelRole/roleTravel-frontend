import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

const SignCheckBoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;

  .all-check {
    margin-bottom: 30px;
  }

  .each-check {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;

const CheckWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  label {
    width: 95%;
    span {
      color: ${(props) => props.color};
    }
  }
`;

const CheckBox = styled.input`
  appearance: none;
  border: 1px solid #ddd;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;

  &:checked {
    background-image: url("data:image/svg+xml,%3Csvg width='30' height='25' viewBox='0 0 30 25' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 13.2245L9.78751 22.6089C10.1572 23.0544 10.7783 23.0544 11.148 22.6089L28.25 2' stroke='%233884FD' stroke-width='3' stroke-linecap='round'/%3E%3C/svg%3E");
    background-size: 80% 80%;
    background-position: 50%;
    background-repeat: no-repeat;
  }
`;

const checkData = [
  {
    id: "check1",
    span: `[필수] `,
    title: `이용 약관 동의`,
    isRequired: true,
  },
  {
    id: "check2",
    span: `[필수] `,
    title: `개인정보 수집 및 이용 동의`,
    isRequired: true,
  },
  {
    id: "check3",
    span: `[선택] `,
    title: `광고성 정보 이메일 수신 동의`,
    isRequired: false,
  },
  {
    id: "check4",
    span: `[선택] `,
    title: `광고성 정보 SMS 수신 동의`,
    isRequired: false,
  },
];

const SignCheckBox = ({ setFormData, formData }) => {
  // 체크된 아이템을 담을 배열
  const [checkItems, setCheckItems] = useState([]);

  const handleSingleCheck = useCallback(
    (e) => {
      const { name, checked } = e.target;
      if (checked) {
        setCheckItems((prev) => [...prev, name]);
        setFormData({
          ...formData,
          check: { ...formData.check, [name]: checked },
        });
      } else {
        setCheckItems(checkItems.filter((item) => item !== name));
        setFormData({
          ...formData,
          check: { ...formData.check, [name]: checked },
        });
      }
    },
    [checkItems, formData, setFormData]
  );

  const handleAllCheck = useCallback(
    (e) => {
      if (e.target.checked) {
        const idArray = [];
        checkData.forEach((data) => {
          formData.check[data.id] = true;
          idArray.push(data.id);
        });
        setCheckItems(idArray);
      } else {
        setCheckItems([]);
        setFormData({
          ...formData,
          check: { check1: false, check2: false, check3: false, check4: false },
        });
      }
    },
    [formData]
  );

  return (
    <SignCheckBoxWrap>
      <div className="all-check">
        <CheckWrap>
          <label htmlFor="all-checkbox">
            필수동의 항목 및 개인정보 수집 및 이용 동의(선택), 광고성 정보
            수신(선택) 에 모두 동의합니다.
          </label>
          <CheckBox
            type="checkbox"
            id="all-checkbox"
            onChange={handleAllCheck}
            checked={checkItems.length === checkData.length ? true : false}
          />
        </CheckWrap>
      </div>

      <div className="each-check">
        {checkData.map((item) => (
          <CheckWrap
            key={item.id}
            color={
              item.id === "check1" || item.id === "check2" ? "red" : "black"
            }
          >
            <label htmlFor={item.id}>
              <span>{item.span}</span>
              {item.title}
            </label>
            <CheckBox
              type="checkbox"
              name={item.id}
              required={item.isRequired}
              onChange={handleSingleCheck}
              checked={checkItems.includes(item.id) ? true : false}
            />
          </CheckWrap>
        ))}
      </div>
    </SignCheckBoxWrap>
  );
};

export default SignCheckBox;
