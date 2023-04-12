import styled, { css } from "styled-components";

const sizeStyles = css`
  ${(props) =>
    props.size === "full" &&
    css`
      width: 100%;
      padding: 1.5rem 0;
      font-size: 1.6rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.size === "medium" &&
    css`
      width: 100%;
      max-width: 18rem;
      font-size: 1.6rem;
    `}

${(props) =>
    props.size === "small" &&
    css`
      width: 100%;
      max-width: 13rem;
      font-size: 1.6rem;
      border-radius: 20px;
    `}
`;

const colorStyles = css`
  ${(props) =>
    props.color === "blue" &&
    css`
      color: #fff;
      border: none;
      background-color: #3884fd;
    `}

  ${(props) =>
    props.color === "stroke" &&
    css`
      color: #333;
      border: 1px solid #c4c4c4;
      background-color: #fafafa;
    `}

    ${(props) =>
    props.color === "gray" &&
    css`
      color: #fff;
      border: none;
      background-color: #c4c4c4;
    `}
`;

const StyledButton = styled.button`
  text-align: center;
  outline: none;
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};

  border-radius: 0.8rem;
  cursor: pointer;
  padding: 15px 0;
  ${colorStyles};
  ${sizeStyles};

  &:disabled {
    background-color: #d9d9d9;
    cursor: default;
  }
`;

const Button = ({ children, size, ...props }) => {
  return (
    <StyledButton size={size} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
