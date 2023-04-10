import React, { useState } from "react";
import styled from "styled-components";
import Info from './Section//Info'
import ChangePassword from './Section/ChangePassword'
import HeaderSection from "./Section/HeaderSection";

const ContentWrap = styled.div`
  width: 100%;
  height: 60vh;
  margin-left: 20px;
  margin-rigth: 20px;
  display: flex;
  justify-content: center;
`

const Section = styled.div`
  height: 100%;
  width: 100%;
  display: flex;

  &:nth-child(1) {
    flex-direction: column;
    align-items: flex-end;
    margin-right: 4rem;
    display: flex;
  }

  &:nth-child(2) {
    flex-direction: column;
    width: 100%;
  }
`

const Box = styled.div`
  width: 100%;

  &:nth-child(1) {
    display: flex;
    height: 7%;
    text-align: center;
    align-items: center;
  }
`

const Tab = styled.div`
  height: 100%;
  width: 100%;
  padding-top: 5px;
  border: ${(props) => props.border};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
  background: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};

  &:nth-child(1) {
    border-right: none;
  }
`

const Avatar = styled.img`
  object-fit: cover;
  overflow: hidden;
  border-radius: 100%;
  width: 160px;
  height: 160px;
  margin-top: 4.5rem;
  margin-bottom: 2rem;
`


const UserAccount = () => {
  const [clicked, setClicked] = useState(true);

  return (
    <>
      <HeaderSection />
      <ContentWrap>
        <Section>
          {clicked && (
            <>
              <Avatar src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1635&q=80" alt="avatar" />
              <p style={{ width: '160px', display: 'flex', justifyContent: 'center'}}>홍길동 님</p>
            </>
          )}
        </Section>
        <Section>
          <Box>
            <Tab
              id="id"
              color={clicked ? "#fff" : "black"}
              backgroundColor={clicked ? "#3884fd" : "#fff"}
              border={clicked ? 'none' : '1px solid black'}
              onClick={() => setClicked(true)}
            >
              회원정보 수정
            </Tab>
            <Tab
              id="pw"
              color={!clicked ? "#fff" : "black"}
              backgroundColor={!clicked ? "#3884fd" : "#fff"}
              border={!clicked ? 'none' : '1px solid black'}
              onClick={() => setClicked(false)}
            >
              비밀번호 변경
            </Tab>
          </Box>
          <Box>
            {clicked ? <Info /> : <ChangePassword />}
          </Box>
        </Section>
        <Section></Section>
      </ContentWrap>
    </>
  );
};

export default UserAccount;
