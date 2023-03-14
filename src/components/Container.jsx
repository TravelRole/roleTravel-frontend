import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  display: ${(props) => props.flex && "flex"};
  align-items: ${(props) => props.alignCenter && "center"};
  justify-content: ${(props) => props.justifySpace && "space-between"};
`;
