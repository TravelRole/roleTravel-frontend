import React from "react";
import { useState } from "react";
import Icons from "../../../../assets/icon/icon";
import styled from "styled-components";

const RoleEditInputWrap = styled.div``;

const RoleEditInputValue = styled.div`
  ul {
    display: flex;
  }
`;

const RoleEditInputOptions = styled.div``;

const RoleEditInput = ({ roles }) => {
  const [isOpen, setIsOpen] = useState(false); // 메뉴 열림/닫힘 상태
  const [selectedOptions, setSelectedOptions] = useState([...roles]); // 선택된 옵션들

  const options = [
    { value: "일정", label: "일정" },
    { value: "회계", label: "회계" },
    { value: "예약", label: "예약" },
    { value: "역할없음", label: "역할없음" },
  ];

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue) => {
    const isSelected = selectedOptions.includes(optionValue);
    let updatedOptions = [];

    if (isSelected) {
      updatedOptions = selectedOptions.filter((value) => value !== optionValue);
    } else {
      updatedOptions = [...selectedOptions, optionValue];
    }

    setSelectedOptions(updatedOptions);
  };

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
          {/* {selectedOptions.length > 0 &&
            selectedOptions.map((value) => )} */}
        </ul>
        <i>{isOpen ? <Icons.HiChevronUp /> : <Icons.HiChevronDown />}</i>
      </RoleEditInputValue>
      {isOpen && (
        <RoleEditInputOptions>
          {options.map((option) => (
            <label key={option.value}>
              <input
                type="checkbox"
                checked={selectedOptions.includes(option.value)}
                onChange={() => handleOptionClick(option.value)}
              />
              {option.label}
            </label>
          ))}
        </RoleEditInputOptions>
      )}
    </RoleEditInputWrap>
  );
};

export default RoleEditInput;
