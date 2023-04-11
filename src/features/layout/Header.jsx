import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Container } from "../../components/Container";
import logo from "../../assets/images/logo.png";
import { useDispatch } from "react-redux";
import { logoutAsync } from "../Login/authSlice";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { HiUser, HiOutlineLogout } from "react-icons/hi";

const HeaderWrap = styled.header`
  padding: 2rem;
  display: flex;
  align-items: center;
  height: 10rem;

  h1 {
    img {
      width: 20%;
      min-width: 10rem;
    }
  }

  dl.header-profile {
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    dt {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

const ProfileMenu = styled.div`
  position: absolute;
  top: 5rem;
  right: 0;
  z-index: 20;
  background-color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 2rem;
  border-radius: 2rem;

  dl.menu-profile {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    dt {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    dd {
      display: flex;
      flex-direction: column;
      gap: 5px;
      font-weight: bold;
      span {
        font-weight: lighter;
        font-size: 14px;
        color: #777;
      }
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    gap: 10px;

    li {
      cursor: pointer;
      display: flex;
      gap: 20px;
      align-items: center;
      padding: 5px 0;
      span {
        font-size: 20px;
      }
    }
  }
`;

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickLogout = useCallback(() => {
    dispatch(logoutAsync());
  }, [dispatch]);

  const onControlMenu = useCallback(() => {
    setOpenMenu((prev) => !prev);
  }, []);

  if (
    location.pathname === "/landing" ||
    location.pathname === "/login" ||
    location.pathname === "/sign"
  ) {
    return (
      <HeaderWrap>
        <Container flex alignCenter>
          <h1>
            <img src={logo} alt="여행역할 로고" />
          </h1>
        </Container>
      </HeaderWrap>
    );
  }
  return (
    <HeaderWrap>
      <Container flex alignCenter justifySpace>
        <h1>
          <img src={logo} alt="여행역할 로고" />
        </h1>
        <dl className="header-profile" onClick={onControlMenu}>
          <dt>
            <img src={user?.profile} alt="유저이미지" />
          </dt>
          <dd>{user?.name}님</dd>
          <dd>
            <MdKeyboardArrowDown />
          </dd>
        </dl>
        {openMenu && (
          <ProfileMenu>
            <dl className="menu-profile" onClick={onControlMenu}>
              <dt>
                <img src={user?.profile} alt="유저이미지" />
              </dt>
              <dd>
                {user?.name}
                <span>{user?.email}</span>
              </dd>
            </dl>
            <ul>
              <li onClick={() => navigate("/setUser")}>
                <span>
                  <HiUser />
                </span>
                계정 관리
              </li>
              <li onClick={onClickLogout}>
                <span>
                  <HiOutlineLogout />
                </span>
                로그아웃
              </li>
            </ul>
          </ProfileMenu>
        )}
      </Container>
    </HeaderWrap>
  );
};

export default Header;
