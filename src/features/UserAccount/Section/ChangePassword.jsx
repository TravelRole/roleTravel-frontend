import { useState } from "react";
import { Button, Container, Content, Input, InputContainer, Label } from "./Styles";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


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
      <Content marginTop="-59px">
        <h1>비밀번호 변경</h1>
        <div width="76px">
          <p>비밀번호는 8~16자 영문, 숫자, 특수문자를 사용할 수 있습니다.</p>
          <p>비밀번호는 <span style={{ color: '#3884FD'}}>주기적(최소 6개월)</span>으로 변경해 주시기 바랍니다.</p>
        </div>
      </Content>
      <Content>
        <InputContainer>
          {/* <Label width="100px">현재 비밀번호</Label> */}
          <Input name="password" value={pw.password} onChange={changeHandler} placeholder="비밀번호" />
        </InputContainer>
        <InputContainer>
          {/* <Label width="100px">새로운 비밀번호</Label> */}
          <Input name="confirm" value={pw.forConfirm} onChange={changeHandler} placeholder="새로운 비밀번호" />
        </InputContainer>
      </Content>
      <Content>
        <Button onClick={() => navigate('/home')} backgroundColor="#FAFAFA" color="black" border="1px solid #C4C4C4">취소</Button>
        <Button onClick={updateHandler} backgroundColor="#3884FD" color="white" border="none">수정하기</Button>
      </Content>
    </Container>
  )
};

export default ChangePassword;