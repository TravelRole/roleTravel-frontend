import styled, { css } from "styled-components";

const sizeStyles = css`
  ${(props) =>
    props.size === "full" &&
    css`
      width: 100%;
      padding: 15px 0;
      font-size: 1rem;
    `}

  ${(props) =>
    props.size === "large" &&
    css`
      width: 50%;
      padding: 15px 0;
      font-size: 0.9rem;
    `}

${(props) =>
    props.size === "medium" &&
    css`
      width: 30%;
      padding: 10px 0;
      font-size: 0.9rem;
    `}

${(props) =>
    props.size === "small" &&
    css`
      padding: 8px 20px;
      font-size: 0.9rem;
      border-radius: 20px;
    `}
`;

const colorStyles = css`
  ${(props) =>
    props.color === "#3884fd" &&
    css`
      color: #fff;
      border: none;
      background-color: #3884fd;
    `}

  ${(props) =>
    props.color === "#ddd" &&
    css`
      color: #393939;
      border: none;
      background-color: #ddd;
    `}

    ${(props) =>
    props.color === "#fff" &&
    css`
      color: black;
      border: 1px solid #ddd;
      background-color: #fff;
    `}


    ${(props) =>
    props.color === "#000" &&
    css`
      color: #fff;
      border: none;
      background-color: #000;
    `}
`;

const StyledButton = styled.button`
  text-align: center;
  outline: none;
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  cursor: pointer;
  padding: 15px 0;
  ${colorStyles};
  ${sizeStyles};
`;

const Button = ({ children, size, ...props }) => {
  return (
    <StyledButton size={size} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
