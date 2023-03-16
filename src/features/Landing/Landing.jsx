import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container } from "../../components/Container";

const Header = styled.header`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;

  h1 {
    font-size: 1.7rem;
    font-weight: bold;
  }
  div {
    button {
      padding: 10px 20px;
      border-radius: 10px;
      border: none;
      background-color: #3884fd;
      color: #fff;
      font-size: 1rem;
      cursor: pointer;
    }
  }
`;

const BannerWrap = styled.section`
  background-color: #3884fd;
  width: 100%;
  height: 600px;
  div {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    dl {
      margin-bottom: 30px;
      text-align: center;
      color: #fff;
      dt {
        font-size: 2.6rem;
        line-height: 3rem;
        margin-bottom: 20px;
      }
      dd {
        font-size: 1.5rem;
        line-height: 1.8rem;
        font-weight: lighter;
      }
    }

    button {
      padding: 10px 40px;
      font-size: 1.2rem;
      background-color: #fff;
      border: none;
      border-radius: 10px;
      cursor: pointer;
    }
  }
`;

const Contents = styled.section`
  text-align: center;
  font-size: 2rem;
  line-height: 250px;
`;

const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header>
        <Container flex alignCenter justifySpace>
          <h1>로고</h1>
          <div>
            <button onClick={() => navigate("/login")}>Login/Join</button>
            {/* login 시에 보일 프로필 (프로필 클릭시 드롭앤다운으로 정보관리, 로그아웃 보이도록함.) */}
          </div>
        </Container>
      </Header>
      <BannerWrap>
        <Container>
          <div>
            <dl>
              <dt>
                당신의 여행을 완벽하게 만들어줄
                <br />
                여행 계획 사이트
              </dt>
              <dd>
                친구, 연인, 가족들과 함께
                <br />
                각자 역할을 정하고 계획을 세워봐요!
              </dd>
            </dl>
            {/* 여행 목록 페이지로 이동 (로그인 유무에 따라 로그인페이지로 이동 or 여행 목록페이지로 이동) */}
            <button>시작하기</button>
          </div>
        </Container>
      </BannerWrap>
      <Contents>
        <div>홍보 및 문구 사진</div>
      </Contents>
    </>
  );
};

export default Landing;
