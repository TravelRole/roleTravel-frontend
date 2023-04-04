import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container } from "../../components/Container";
import Header from "../layout/Header";

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
      <Header />
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
            {/* userid 가 있다면, userid 의 여행 게획 리스트 페이지로 이동 */}
            {/* userid 가 없다면, login 페이지로 이동함 */}
            <button onClick={() => navigate("/login")}>Login</button>
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
