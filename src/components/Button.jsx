import { Children } from "react";
import styled, { css } from "styled-components";

export const StyledButton = styled.button`
  text-align: center;
  outline: none;
  border: ${(props) => props.border};
  color: ${(props) => props.fontColor};
  cursor: pointer;
  padding: 15px 0;
  background-color: ${(props) => props.color};
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
`;

const Button = ({
  children,
  width,
  color,
  border,
  fontColor,
  margin,
  ...rest
}) => {
  return (
    <StyledButton
      color={color}
      width={width}
      border={border}
      fontColor={fontColor}
      margin={margin}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
