import { OutlinedInput } from "@mui/material";
import styled from "styled-components";

export const ModalWrapper = styled.div`
  width: 100%;
  box-shadow: 0rem 2rem 2rem rgba(0, 0, 0, 0.08), 0rem 0rem 2rem rgba(0, 0, 0, 0.12);
  border-radius: 1.6rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: none;
`;

export const Header = styled.div`
  padding-top: 2.1rem;
  width: 100%;
  border-bottom: 0.1rem solid #e6e6e6;
  padding-left: 2.5rem;
  padding-bottom: 2.4rem;
`;

export const Title = styled.h1`
  font-family: "Unbounded", cursive;
  font-weight: 500;
  font-size: 1.6rem;
  color: #ffc759;
  margin-bottom: 1rem;
`;

export const AddEssentialSpan = styled.span`
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
`;

export const Body = styled.div`
  width: 100%;
  padding-left: 2.5rem;
  min-height: 19.8rem;
  max-height: 39.2rem;
  padding-top: 1.6rem;
  padding-right: 2.5rem;
`;

export const ButtonList = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

export const CategoryButton = styled.button`
  height: 3.3rem;
  background: #fff;
  border-radius: 0.8rem;
  cursor: pointer;
  border: ${(props) =>
    props.clicked ? "0.1rem solid #3884fd" : "0.1rem solid #c4c4c4"};
  box-shadow: ${(props) =>
    props.clicked ? "0rem 0.1rem 0.4rem 0.1rem #D9E6FF" : "none"};
  color: ${(props) => (props.clicked ? "#3884fd" : "#c4c4c4")};
  padding: 0.8rem 1.5rem;
`;

export const ColumnFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap};
`;

export const RowFlex = styled.div`
  display: flex;
  gap: ${(props) => props.gap};
`;

export const Footer = styled.div`
  width: 100%;
  height: 8rem;
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 1rem;
  padding-right: 2.4rem;
  border-top: 0.1rem solid #e6e6e6;
`;

export const Button = styled.button`
  width: 9rem;
  height: 4rem;
  border-radius: 0.8rem;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => (props.color === "blue" ? "none" : "0.1rem solid #C4C4C4")};
  background: ${(props) => (props.color === "blue" ? "#3884fd" : "#fff")};
  color: ${(props) => (props.color === "blue" ? "#fff" : "#333")};
`;

export const StyledInput = styled(OutlinedInput)`
  width: 100%;
  height: 4.8rem;
  font-size: 1.8rem;
  font-weight: 400;
  color: #c4c4c4;
  margin-right: 1rem;
`;
