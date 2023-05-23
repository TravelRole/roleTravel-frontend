import React, { useEffect, useState } from "react";
import Info from "./Section//Info";
import ChangePassword from "./Section/ChangePassword";
import {
  Nav,
  Tab,
  ContentWrap,
  Section,
  Profile,
  Avatar,
  EditIcon,
} from "./Section/Styles";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInfo } from "./LoggedUserSlice";
import Header from "../layout/Header";
import Icons from "../../assets/icon/icon";
import AddImageModal from "./Modal/AddImageModal";
import { useNavigate } from "react-router-dom";

const UserAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedInfo, profile } = useSelector((state) => state.loggedInUser);
  const [clicked, setClicked] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
      return;
    } else {
      dispatch(getLoggedInfo());
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    setImage(profile)
  }, [profile])

  const clickHandler = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Header />
      <Nav>
        <Tab
          color={!clicked ? "#A7A7A7" : "#3884FD"}
          onClick={() => setClicked(true)}
        >
          회원정보 수정
        </Tab>
        <Tab
          color={clicked ? "#A7A7A7" : "#3884FD"}
          onClick={() => setClicked(false)}
        >
          비밀번호 변경
        </Tab>
      </Nav>
      <ContentWrap>
        <Section>
          <Profile>
            <div>
              <Avatar src={image} alt="avatar" />
              <EditIcon onClick={clickHandler}>
                <Icons.HiOutlinePencilAlt
                  color="black"
                  style={{
                    postiion: "absolute",
                    width: "1.568rem",
                    height: "1.568rem",
                    marginTop: "-0.8rem",
                  }}
                />
              </EditIcon>
            </div>
            <div>
              <p> {loggedInfo?.name} 님 </p>
            </div>
          </Profile>
        </Section>
        <Section>{clicked ? <Info /> : <ChangePassword />}</Section>
        <Section></Section>
      </ContentWrap>
      {isOpen ? (
        <AddImageModal
          setIsOpen={setIsOpen}
          image={image}
          setImage={setImage}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default UserAccount;
