import React from "react";
import { useState } from "react";
import Icons from "../../../../assets/icon/icon";
import styled from "styled-components";
import { useEffect } from "react";

const RoleEditInputWrap = styled.div`
  position: relative;
`;

const RoleEditInputValue = styled.div`
  display: flex;
  gap: 1.4rem;
  align-items: center;
  cursor: pointer;
  ul {
    display: flex;
    li {
      font-size: 1.5rem;
      color: #8b8b8b;
    }
  }

  i {
    width: 1.8rem;
    height: 1.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a7a7a7;
    svg {
      width: 100%;
      height: 100%;
    }
  }
`;

const RoleEditInputOptions = styled.div`
  z-index: 10;
  border: 1px solid #dadada;
  background: #ffffff;
  width: 15rem;
  border-radius: 1rem;
  margin-top: 1rem;
  position: absolute;
  bottom: 0;
  right: -1.2rem;
`;

const RoleEditInputOptionsContainer = styled.div`
  position: relative;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &::after {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 0 0.8rem 1.1rem;
    border-color: #ffffff transparent;
    display: block;
    width: 0;
    top: -1.1rem;
    left: 11.2rem;
  }
  &::before {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 0 0.8rem 1.1rem;
    border-color: #dadada transparent;
    display: block;
    width: 0;
    top: -1.2rem;
    left: 11.2rem;
  }
`;

const RoleEditInputOptionsContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  label {
    font-size: 1.6rem;
    color: ${({ check }) => (check ? "#3884fd" : "#8B8B8B")};
  }
  input {
    appearance: none;
    border: 1px solid #ddd;
    border-radius: 50%;
    width: 1.6rem;
    height: 1.6rem;
    margin: 0;

    &:checked {
      background-color: #3884fd;
      border: none;
    }
  }
`;

const RoleEditInput = ({ roles, index, setFormData }) => {
  console.log(roles, index);
  const [isOpen, setIsOpen] = useState(false); // 메뉴 열림/닫힘 상태
  const [selectedOptions, setSelectedOptions] = useState([...roles]); // 선택된 옵션들

  const options = [
    { value: "일정", label: "일정", id: "option-schedule" },
    { value: "회계", label: "회계", id: "option-account" },
    { value: "예약", label: "예약", id: "option-reservation" },
    { value: "역할없음", label: "역할없음", id: "option-none" },
  ];

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue) => {
    let updatedOptions = [];

    if (optionValue === "역할없음") {
      updatedOptions = ["역할없음"];
    } else {
      if (selectedOptions.includes("역할없음")) {
        updatedOptions = selectedOptions.filter(
          (value) => value !== "역할없음"
        );
      } else {
        updatedOptions = [...selectedOptions];
      }

      const optionIndex = updatedOptions.indexOf(optionValue);

      if (optionIndex !== -1) {
        updatedOptions.splice(optionIndex, 1);
      } else {
        updatedOptions.push(optionValue);
      }

      if (updatedOptions.length === 0) {
        updatedOptions = ["역할없음"];
      }
    }
    setSelectedOptions(updatedOptions);
    setFormData((prev) => {
      const rolesDataCopy = [...prev.roles];

      // rolesData[targetIndex]의 roles 배열을 수정합니다.
      const updatedRolesData = {
        ...rolesDataCopy[index], // 기존 객체의 속성을 복사합니다.
        roles: updatedOptions, // 수정할 roles 배열을 설정합니다.
      };
      // rolesData 배열을 새로운 배열로 교체합니다.
      const updatedRolesDataArray = [
        ...rolesDataCopy.slice(0, index), // targetIndex 이전의 객체들을 그대로 복사합니다.
        updatedRolesData, // 수정된 rolesData 객체를 추가합니다.
        ...rolesDataCopy.slice(index + 1), // targetIndex 이후의 객체들을 그대로 복사합니다.
      ];
      return {
        ...prev,
        roles: updatedRolesDataArray,
      };
    });
  };

  useEffect(() => {
    if (selectedOptions.includes("역할없음") && selectedOptions.length > 1) {
      setSelectedOptions(
        selectedOptions.filter((value) => value !== "역할없음")
      );
    }
  }, [selectedOptions]);

  return (
    <RoleEditInputWrap className="multiselect">
      <RoleEditInputValue onClick={handleToggleMenu}>
        <ul>
          {selectedOptions.map((option, i) =>
            i === 0 ? (
              <li key={option}>{option}</li>
            ) : (
              <li key={option}>&#183;{option}</li>
            )
          )}
        </ul>
        {roles.includes("총무") ? (
          <i />
        ) : (
          <i>{isOpen ? <Icons.HiChevronUp /> : <Icons.HiChevronDown />}</i>
        )}
      </RoleEditInputValue>
      {roles.includes("총무")
        ? null
        : isOpen && (
            <RoleEditInputOptions>
              <RoleEditInputOptionsContainer>
                {options.map((option) => (
                  <RoleEditInputOptionsContent
                    key={option.id}
                    check={selectedOptions.includes(option.value)}
                  >
                    <input
                      type="checkbox"
                      id={option.id}
                      checked={selectedOptions.includes(option.value)}
                      onChange={() => handleOptionClick(option.value)}
                    />
                    <label key={option.value} htmlFor={option.id}>
                      {option.label}
                    </label>
                  </RoleEditInputOptionsContent>
                ))}
              </RoleEditInputOptionsContainer>
            </RoleEditInputOptions>
          )}
    </RoleEditInputWrap>
  );
};

export default RoleEditInput;
