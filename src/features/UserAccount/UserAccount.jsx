import React, { useEffect, useState } from "react";
import Info from './Section//Info'
import ChangePassword from './Section/ChangePassword'
import { Nav, Tab, ContentWrap, Section, Profile, Avatar, EditIcon } from "./Section/Styles";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInfo } from "./LoggedUserSlice";
import Header from '../layout/Header';
import Icons from "../../assets/icon/icon";


const UserAccount = () => {
  const [clicked, setClicked] = useState(true);
  const dispatch = useDispatch();
  const { presignedUrl, loggedInfo } =
    useSelector((state) => state.loggedUser);
  
  useEffect(() => {
    dispatch(getLoggedInfo());
  }, [dispatch]);

  useEffect(() => {
    
  })

  const changeAvatarHandler = () => {
    console.log('이미지 변경 성공')
  };

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
            <div>
              <Avatar src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1635&q=80" alt="avatar" />
              <EditIcon onClick={changeAvatarHandler}>
                  <Icons.HiOutlinePencilAlt color="black" style={{ postiion: 'absolute', width: '15.68px', height: '15.68px'}} />
              </EditIcon>
            </div>
            <div>
              <p> 홍길동 님 </p>
              <span>{loggedInfo.provider === 'google' ? <Icons.FcGoogle /> : <></>}</span>
            </div>
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
