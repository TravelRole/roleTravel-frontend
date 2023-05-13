import { OutlinedInput } from "@mui/material";
import styled from "styled-components";

export const Blur = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const ModalWrapper = styled.div`
  width: 382px;
  /* height: 371px; */
  box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.08), 0px 0px 2px rgba(0, 0, 0, 0.12);
  border-radius: 16px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: none;
`;

export const Header = styled.div`
  padding-top: 21px;
  width: 100%;
  border-bottom: 1px solid #e6e6e6;
  padding-left: 25px;
  padding-bottom: 24px;
`;

export const Title = styled.h1`
  font-family: "Unbounded", cursive;
  font-weight: 500;
  font-size: 1.6rem;
  color: #ffc759;
  margin-bottom: 10px;
`;

export const AddEssentialSpan = styled.span`
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
`;

export const Body = styled.div`
  width: 100%;
  padding-left: 25px;
  min-height: 198px;
  max-height: 392px;
  padding-top: 16px;
  padding-right: 25px;
  overflow: scroll;
`;

export const ButtonList = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 10px;
`;

export const CategoryButton = styled.button`
  height: 33px;
  background: #fff;
  border-radius: 8px;
  cursor: pointer;
  border: ${(props) =>
    props.clicked ? "1px solid #3884fd" : "1px solid #c4c4c4"};
  box-shadow: ${(props) =>
    props.clicked ? "0px 1px 4px 1px #D9E6FF" : "none"};
  color: ${(props) => (props.clicked ? "#3884fd" : "#c4c4c4")};
  padding: 8px 15px;
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
  height: 80px;
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 10px;
  padding-right: 24px;
  border-top: 1px solid #e6e6e6;
`;

export const Button = styled.button`
  width: 90px;
  height: 40px;
  border-radius: 8px;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => (props.color === "blue" ? "none" : "1px solid #C4C4C4")};
  background: ${(props) => (props.color === "blue" ? "#3884fd" : "#fff")};
  color: ${(props) => (props.color === "blue" ? "#fff" : "#333")};
`;

export const StyledInput = styled(OutlinedInput)`
  width: 100%;
  height: 48px;
  font-size: 1.8rem;
  font-weight: 400;
  color: #c4c4c4;
  margin-right: 10px;
`;
