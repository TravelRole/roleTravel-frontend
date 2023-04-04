import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";
import { Container } from "../../components/Container";
import logo from "../../assets/images/logo.png";
import { useDispatch } from "react-redux";
import { logoutAsync } from "../Login/authSlice";

const HeaderWrap = styled.header`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    flex: 1;
    font-size: 1.7rem;
    font-weight: bold;
    img {
      width: 30%;
      min-width: 100px;
    }
  }
  div {
    display: flex;
    justify-content: right;
    flex: 1;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClickLogout = useCallback(() => {
    dispatch(logoutAsync());
  }, [dispatch]);
  return (
    <HeaderWrap>
      <Container flex alignCenter justifySpace>
        <h1>
          <img src={logo} alt="여행역할 로고" />
        </h1>
        <div>
          <Button
            size="medium"
            color="#3884fd"
            onClick={() => navigate("/login")}
          >
            Login/Join
          </Button>
          <Button
            size="medium"
            margin={"0 10px"}
            color="#3884fd"
            onClick={onClickLogout}
          >
            Logout
          </Button>
          {/* login 시에 보일 프로필 (프로필 클릭시 드롭앤다운으로 정보관리, 로그아웃 보이도록함.) */}
        </div>
      </Container>
    </HeaderWrap>
  );
};

export default Header;
