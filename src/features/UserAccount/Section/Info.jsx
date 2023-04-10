import { useState } from "react";
import styled from "styled-components";
import { validation } from './validation';
import { useNavigate } from "react-router-dom";
import { Button, Container, DateInput, Divider, Input, InputContainer, Label } from "./Styles";

const Content = styled.div`

  &:nth-child(1){
    margin-bottom: 30px;
  }

  &:nth-child(2){
    margin-bottom: 20px;
  }

  &:nth-child(3) {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 20px;
  }
`

const Info = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [date, setDate] = useState({ year: '', month: '', date: ''});

  const changeHandler = (e) => {
    const {value, name} = e.target;
    if (name === 'nickname') {
      setNickname(value)
    } else if (name === 'year') {
      setDate({ ...date, year: value })
    } else if (name === 'month') {
      setDate({ ...date, month: value })
    } else if (name === 'date') {
      setDate({ ...date, date: value })
    }
  };
  
  const updateHandler = () => {
    console.log('수정이 완료되었습니다!')
  };

  return (
    <Container>
      <Content>
        <h1>회원정보 수정</h1>
        <p>회원님의 정보를 수정/확인 하실 수 있습니다.</p>
      </Content>
      <Content>
        <InputContainer>
          <Label width="80px">아이디</Label>
          <span style={{ fontSize: '14px', color: 'grey'}}>asdfasdf@asfasdf.com</span>
        </InputContainer>
        <InputContainer>
          <Label width="80px">이름 (별명)</Label>
          <Input name="nickname" value={nickname} onChange={changeHandler} />
        </InputContainer>
        <InputContainer>
          <Label width="80px">생년월일</Label>
          <div style={{ width: '76%' }}>
            <DateInput maxLength={4} name="year" value={date.year} onChange={changeHandler} />
            <DateInput maxLength={2} name="month" value={date.month} onChange={changeHandler} />
            <DateInput maxLength={2} name="date" value={date.date} onChange={changeHandler} />
          </div>
        </InputContainer>
      </Content>
      <Content>
        <Button onClick={updateHandler}>수정하기</Button>
        <Button onClick={() => navigate('/home')}>취소</Button>
      </Content>
      <Divider />
      <Content>
        <p style={{ fontSize: '11px', color: '#8a8a8a', cursor: 'pointer' }}>계정 탈퇴하기</p>
      </Content>
    </Container>
  )
};

export default Info;