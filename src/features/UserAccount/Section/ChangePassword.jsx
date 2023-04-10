import { useState } from "react";
import { Button, Container, Divider, Input, InputContainer, Label } from "./Styles";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Content = styled.div`
  &:nth-child(1){
    margin-bottom: 40px;

    & > p:nth-child(2) {
      font-size: 16px;
    }

    & > p:nth-child(3) {
      margin-top: 3px;
      color: #3884FD;
      font-size: 16px;
    }
  }

  &:nth-child(2){
    margin-bottom: 50px;
    border: 1px solid black;
    padding: 1rem 2rem;
  }

  &:nth-child(3) {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 20px;
  }
`

const ChangePassword = () => {
  const navigate = useNavigate();
  const [pw, setPW] = useState({ password: '', forConfirm: ''})

  const changeHandler = (e) => {
    const {value, name} = e.target;
    if (name === 'password') {
      setPW({ ...pw, password: value})
    } else if (name === 'confirm') {
      setPW({ ...pw, forConfirm: value})
    } 
  };
  
  const updateHandler = () => {
    console.log('수정이 완료되었습니다!')
  };

  return (
    <Container>
      <Content>
        <h1>비밀번호 변경</h1>
        <p>비밀번호는 8~16자 영문, 숫자, 특수문자를 사용할 수 있습니다.</p>
        <p>비밀번호는 주기적(최소 6개월)으로 변경해 주시기 바랍니다.</p>
      </Content>
      <Content>
        <InputContainer>
          <Label width="100px">현재 비밀번호</Label>
          <Input name="password" value={pw.password} onChange={changeHandler} />
        </InputContainer>
        <InputContainer>
          <Label width="100px">새로운 비밀번호</Label>
          <Input name="confirm" value={pw.forConfirm} onChange={changeHandler} />
        </InputContainer>
      </Content>
      <Content>
        <Button onClick={updateHandler}>수정하기</Button>
        <Button onClick={() => navigate('/home')}>취소</Button>
      </Content>
    </Container>
  )
};

export default ChangePassword;