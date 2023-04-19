import React, { useEffect, useState } from "react";
import Info from './Section//Info'
import ChangePassword from './Section/ChangePassword'
import { Nav, Tab, ContentWrap, Section, Profile, Avatar } from "./Section/Styles";
import { useDispatch } from "react-redux";
import { getLoggedInfo } from "./LoggedUserSlice";
import Header from '../layout/Header';
import GoogleIcon from '@mui/icons-material/Google';


const UserAccount = () => {
  const [clicked, setClicked] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLoggedInfo());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Nav>
        <Tab color={!clicked ? '#A7A7A7' : '#3884FD'} onClick={() => setClicked(true)}>회원정보 수정</Tab>
        <Tab color={clicked ? '#A7A7A7' : '#3884FD'} onClick={() => setClicked(false)}>비밀번호 변경</Tab>
      </Nav>
      <ContentWrap>
        <Section>
          <Profile>
            <Avatar src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1635&q=80" alt="avatar" />
            <p>홍길동 님 <GoogleIcon /></p>
          </Profile>
        </Section>
        <Section>
          {clicked ? <Info /> : <ChangePassword />}
        </Section>
        <Section></Section>
      </ContentWrap>
    </>
  );
};

export default UserAccount;
