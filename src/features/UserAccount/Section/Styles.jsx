import styled from "styled-components"

export const Container = styled.div`
  margin-top: 40px;

  h1 {
    font-size: 24px;
  }

  p {
    margin-top: 8px;
    font-size: 18px;
  }
`

export const Label = styled.label`
  font-size: 15px;
  width: ${(props) => props.width};
`

export const Input = styled.input`
  border: 1px solid black;
  height: 32px;
  width: 65%;
  font-size: 14px;
  padding-left: 8px;
`

export const DateInput = styled.input`
  width: 19%;
  height: 32px;
  margin-right: 6px;
  border: 1px solid black;
  font-size: 14px;
  text-align: center;
`

export const InputContainer = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  flex-direction: row;
  gap: 30px;
  align-items: center;
`

export const Button = styled.button`
  border: none;
  padding: 1.1% 1%;
  font-size: 11px;
  width: 13%;

  &:nth-child(1) {
    background: #3a425f;
    color: white;
  }

  &:nth-child(2) {
    background: #6b6970;
    color: white;
  }
`

export const Divider = styled.hr`
  border: 0;
  height: 1.5px;
  background: gray;
`