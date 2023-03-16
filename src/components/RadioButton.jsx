import React from "react";
import styled from "styled-components";

const Radio = styled.input`
  appearance: none;
  border: 1px solid #ddd;
  border-radius: 50%;
  width: 1.2rem;
  height: 1.2rem;
  margin: 0;

  &:checked {
    background-color: #3884fd;
    border: none;
  }
`;

const RadioButton = ({ ...props }) => {
  return <Radio type="radio" {...props} />;
};

export default RadioButton;
