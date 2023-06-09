import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Icons from "../../assets/icon/icon";
import { Container } from "../../components/Container";
import logo from "../../assets/images/logo.png";
import { useDispatch } from "react-redux";
import { logout } from "../Login/authSlice";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { HiUser, HiOutlineLogout } from "react-icons/hi";
import { getUserInfo } from "../Landing/userSlice";

const HeaderWrap = styled.header`
  padding: 2rem;
  display: flex;
  align-items: center;
  height: 10rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  h1 {
    cursor: pointer;
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
    dd {
      width: 2rem;
      height: 2rem;
      svg {
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
    gap: 1rem;
    margin-bottom: 2rem;
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
    dd {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-weight: 500;
      font-size: 1.4rem;
      span {
        font-weight: 400;
        font-size: 1.4rem;
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
      gap: 2rem;
      align-items: center;
      padding: 0.5rem 0;
      font-size: 1.4rem;
      span {
        width: 2.4rem;
        height: 2.4rem;
        svg {
          width: 100%;
          height: 100%;
        }
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
    dispatch(logout()).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/login");
        return;
      }
    });
  }, [dispatch, navigate]);

  const onControlMenu = useCallback(() => {
    setOpenMenu((prev) => !prev);
  }, []);

  useEffect(() => {
    if (
      location.pathname === "/spaceList" ||
      location.pathname === "/useraccount"
    )
      if (localStorage.getItem("accessToken")) {
        dispatch(getUserInfo());
      }
  }, [dispatch, location.pathname]);

  if (
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/sign" ||
    location.pathname === "/searchIdPw"
  ) {
    return (
      <HeaderWrap>
        <Container flex alignCenter>
          <h1 onClick={() => navigate("/")}>
            <img src={logo} alt="여행역할 로고" />
          </h1>
        </Container>
      </HeaderWrap>
    );
  }
  return (
    <HeaderWrap>
      <Container flex alignCenter justifySpace>
        <h1 onClick={() => navigate("/spaceList")}>
          <img src={logo} alt="여행역할 로고" />
        </h1>
        <dl className="header-profile" onClick={onControlMenu}>
          <dt>
            <img src={user?.profile} alt="유저이미지" />
          </dt>
          <dd>
            {openMenu ? (
              <Icons.MdKeyboardArrowUp />
            ) : (
              <Icons.MdKeyboardArrowDown />
            )}
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
              <li onClick={() => navigate("/useraccount")}>
                <span>
                  <Icons.HiUser />
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
