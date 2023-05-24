import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container } from "../../components/Container";
import Header from "../layout/Header";
import LandingImages from "../../assets/images/LandingImage/LandingImages";

const LandingWrap = styled.div``;

const LandingBanner = styled.section`
  /* background-color: #f8f8f8; */
  background-image: url(${LandingImages.bannerImage});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;

  div {
    padding-top: 27rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    dl {
      margin-bottom: 3.6rem;
      dt {
        font-size: 5.2rem;
        margin-bottom: 2rem;
        font-weight: 600;
        color: #141414;
        span {
          font-size: 5.2rem;
          color: #3884fd;
          font-weight: 600;
          position: relative;

          &::after {
            content: "";
            position: absolute;
            top: 0;
            right: -1.5rem;
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 50%;
            background-color: #ffc759;
          }
        }
      }
      dd {
        font-size: 2.2rem;
        font-weight: 500;
        color: #8b8b8b;
      }
    }
    button {
      padding: 1.6rem 2.8rem;
      border-radius: 0.8rem;
      border: none;
      background-color: #3884fd;
      color: #fff;
      font-size: 1.8rem;
      font-weight: 600;
      cursor: pointer;
    }
  }
`;

const SecondSection = styled.section`
  height: 58rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10rem;

    dl {
      dt {
        font-size: 2.4rem;
        font-weight: 400;
        color: #8b8b8b;
        margin-bottom: 3.5rem;
        line-height: 2.9rem;
      }
      dd {
        font-size: 4.8rem;
        color: #333;
        font-weight: 500;
        line-height: 6.7rem;
        span {
          color: #3884fd;
          font-size: 4.8rem;
          font-weight: 500;
        }
      }
    }
  }
`;

const ThirdSection = styled.section`
  width: 100%;
  height: 87rem;
  background-color: #f4f6fb;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ul {
    display: flex;
    gap: 2.6rem;
    align-items: center;
    justify-content: space-between;
    margin-top: 8rem;

    li {
      width: 31rem;
      text-align: center;
      padding: 4.6rem 4.4rem;
      border-radius: 1.6rem;
      background-color: #fff;

      img {
        margin-bottom: 3.5rem;
      }

      dl {
        dt {
          font-size: 2.8rem;
          font-weight: 500;
          color: #333;
          margin-bottom: 1.6rem;
        }
        dd {
          font-size: 1.8rem;
          color: #838999;
          line-height: 2.4rem;
        }
        /* font-size 수정해야할거같다고함. */
      }
    }
  }
`;

const FourthSection = styled.section`
  height: 36rem;
  background-image: url(${LandingImages.fourthSection});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    color: #f1f6ff;
    font-size: 4rem;
    font-weight: 500;
    text-align: center;
    display: flex;
    flex-direction: column;
    span {
      margin-top: 1rem;
      color: #fff;
      font-size: 4rem;
      font-weight: 500;
    }
  }
`;

const FifthSection = styled.section`
  padding: 14rem 0;
  background: linear-gradient(
    180deg,
    #ecf1fd -2.03%,
    rgba(255, 255, 255, 0) 54.14%
  );
`;

const FifthSectionContent = styled.div`
  margin-top: 8rem;
  div {
    padding: 8rem 0 0 4rem;
    width: 100%;
    height: 56rem;
    background: url(${LandingImages.fifth1});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 1.5rem;
    p {
      font-size: 2rem;
      color: #3884fd;
      font-weight: 600;
      font-family: "Unbounded";
      margin-bottom: 3.5rem;
    }
    dl {
      dt {
        font-size: 4.2rem;
        font-weight: 600;
        color: #333;
        margin-bottom: 1.5rem;
      }
      dd {
        font-size: 2.2rem;
        color: #8b8b8b;
        line-height: 3.4rem;
      }
    }
  }

  ul {
    margin-top: 3rem;
    display: flex;
    gap: 3rem;
    li {
      padding: 5rem 0 0 4rem;
      border-radius: 1.5rem;
      height: 56rem;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      font-size: 3.2rem;
      font-weight: 500;
      line-height: 3.8rem;
      color: #333;
      span {
        color: #3884fd;
        font-size: 3.2rem;
      }
    }
    .fifth-left {
      flex: 2;
      max-width: 75.6rem;
      background-image: url(${LandingImages.fifth2});
    }
    .fifth-right {
      flex: 1;
      background-image: url(${LandingImages.fifth3});
    }
  }
`;

const SixthSection = styled.section`
  background-image: url(${LandingImages.sixthBg});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 18rem 0;
`;

const SixthSectionContent = styled.div`
  padding-top: 23.7rem;
  div {
    dl {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
      dt {
        display: flex;
        flex-direction: column;
        gap: 3.5rem;
        font-size: 4.2rem;
        font-weight: 500;
        color: #fff;
        span {
          color: #fff;
          font-size: 2rem;
          font-weight: 500;
          font-family: "Unbounded";
        }
      }
      dd {
        font-size: 2.2rem;
        color: #d7e6ff;
        line-height: 3rem;
        font-weight: 400;
        strong {
          font-size: 2.2rem;
          color: #fff;
          margin: 0 0.6rem;
          font-weight: 400;
        }
      }
    }
  }

  .first-content {
    display: flex;
    gap: 7.5rem;
    margin-bottom: 15.9rem;
    dl {
      padding-top: 5rem;
      width: 29rem;
    }

    ul {
      position: relative;
      li {
        &:last-child {
          position: absolute;
          top: 1rem;
          right: -5rem;
        }
      }
    }
  }

  .second-content {
    display: flex;
    gap: 5rem;
    margin-bottom: 14.4rem;
    dl {
      padding-top: 5rem;
      width: 30.8rem;
    }
  }

  .third-content {
    display: flex;
    gap: 2.7rem;
    margin-bottom: 28.6rem;
    dl {
      padding-top: 5rem;
    }
    ul {
      position: relative;
      li {
        &:last-child {
          position: absolute;
          top: -8.4rem;
          right: -14rem;
        }
      }
    }
  }

  .fourth-content {
    display: flex;
    gap: 7rem;

    dl {
      padding-top: 5rem;
      width: 35rem;
    }

    ul {
      position: relative;
      li {
        &:nth-child(2) {
          position: absolute;
          bottom: 4rem;
          right: -35rem;
        }
        &:nth-child(3) {
          position: absolute;
          bottom: -7rem;
          right: -26rem;
        }
      }
    }
  }
`;

const SeventhSection = styled.section`
  padding: 14rem 0;
  background: linear-gradient(180deg, #f4f6fb 0%, rgba(244, 246, 251, 0) 100%);
  img {
    margin-top: 2.5rem;
    width: 100%;
  }
`;

const EighthSection = styled.section`
  padding: 9rem;
  background: linear-gradient(270deg, #3884fd 3.21%, #9fa9ff 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;

  dl {
    text-align: center;
    dt {
      font-size: 2.4rem;
      font-weight: 600;
      color: #d7e6ff;
      margin-bottom: 1.8rem;
      span {
        font-size: 2.4rem;
        color: #fff;
      }
    }

    dd {
      font-size: 4rem;
      color: #fff;
      font-weight: 500;
    }
  }

  button {
    border: none;
    padding: 1.6rem 2.8rem;
    background-color: #fff;
    border-radius: 0.8rem;
    color: #3884fd;
    font-size: 2rem;
    font-weight: 500;
    cursor: pointer;
  }
`;

const SectionTitle = styled.dl`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  text-align: ${({ position }) => position};
  dt {
    font-size: 2rem;
    color: ${({ color }) => (color === "white" ? "#fff" : "#ffc759")};
    font-weight: 500;
    font-family: "Unbounded";
  }
  dd {
    font-size: 3.8rem;
    font-weight: 500;
    color: ${({ color }) => (color === "white" ? "#fff" : "#333")};
    line-height: 4.5rem;
    span {
      font-size: 3.8rem;
      color: #3884fd;
    }
  }
`;

const Landing = () => {
  const navigate = useNavigate();
  const roleData = [
    {
      image: LandingImages.role1,
      title: "총무",
      content: (
        <dd>
          팀 스페이스를 생성하고
          <br />
          여행의 모든 계획을 총괄해요.
        </dd>
      ),
    },
    {
      image: LandingImages.role2,
      title: "일정",
      content: (
        <dd>
          어디를 갈지 효율적인 동선으로
          <br />
          여행의 전체 일정을 담당해요.
        </dd>
      ),
    },
    {
      image: LandingImages.role3,
      title: "예약",
      content: (
        <dd>
          예약이 필요한 장소를 확인해
          <br />
          직접 예약하는 일을 담당해요.
        </dd>
      ),
    },
    {
      image: LandingImages.role4,
      title: "회계",
      content: (
        <dd>
          지출 내역을 관리하고
          <br />
          여행의 총 경비를 관리해요.
        </dd>
      ),
    },
  ];

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/spaceList");
      return;
    }
  }, [navigate]);

  return (
    <LandingWrap>
      <Header />
      <LandingBanner>
        <div>
          <dl>
            <dt>
              여행 계획의 모든 것, <span>여행 역할</span>
            </dt>
            <dd>
              친구, 연인, 가족들과 함께 각자 역할을 정하고 여행 계획을 세워봐요!
            </dd>
          </dl>
          {/* 여행 목록 페이지로 이동 (로그인 유무에 따라 로그인페이지로 이동 or 여행 목록페이지로 이동) */}
          {/* userid 가 있다면, userid 의 여행 게획 리스트 페이지로 이동 */}
          {/* userid 가 없다면, login 페이지로 이동함 */}
          <button onClick={() => navigate("/login")}>바로 시작하기</button>
        </div>
      </LandingBanner>
      <SecondSection>
        <Container>
          <dl>
            <dt>
              여행 계획 세울 때,
              <br />
              이런 점이 불편하진 않으셨나요?
            </dt>
            <dd>
              이런 고민들,
              <br />
              <span>여행 역할</span>에서 모두
              <br />
              해결해줄게요!
            </dd>
          </dl>
          <img src={LandingImages.section2} alt="여행계획고민들" />
        </Container>
      </SecondSection>
      <ThirdSection>
        <Container>
          <SectionTitle position="center">
            <dt>ROLE TYPE</dt>
            <dd>
              각자가 잘할 수 있는 역할을 선택해
              <br />
              모두가 여행을 <span>함께 계획</span>해요.
            </dd>
          </SectionTitle>
          <ul>
            {roleData.map(({ image, title, content }) => (
              <li key={title}>
                <img src={image} alt={title} />
                <dl>
                  <dt>{title}</dt>
                  {content}
                </dl>
              </li>
            ))}
          </ul>
        </Container>
      </ThirdSection>
      <FourthSection>
        <p>
          계획하는 순간, 여행이 시작돼요.
          <span>여행역할에서 즐거운 시작을 함께 해보세요!</span>
        </p>
      </FourthSection>
      <FifthSection>
        <Container>
          <SectionTitle position="center">
            <dt>MAIN SPACE</dt>
            <dd>
              복잡한 여행 일정짜기,
              <br />
              쉽고 간단하게 시작해보세요!
            </dd>
          </SectionTitle>
          <FifthSectionContent>
            <div>
              <p>00.</p>
              <dl>
                <dt>여행 계획 목록</dt>
                <dd>
                  현재 계획중인 여행과 다녀온 여행의
                  <br />
                  목록을 보며 관리할 수 있어요.
                </dd>
              </dl>
            </div>
            <ul>
              <li className="fifth-left">
                바로 여행을 시작하기 위해
                <br />
                <span>이름과 일자, 장소</span>를 입력해주세요.
              </li>
              <li className="fifth-right">
                초대 받은 사람은
                <br />
                <span>원하는 역할</span>을<br />
                선택할 수 있어요.
              </li>
            </ul>
          </FifthSectionContent>
        </Container>
      </FifthSection>
      <SixthSection>
        <Container>
          <SectionTitle color="white" position="center">
            <dt>TEAM SPACE</dt>
            <dd>
              여행 역할에서 계획을 세운다면
              <br />
              이렇게 편리한 기능을 누릴 수 있어요!
            </dd>
          </SectionTitle>
          <SixthSectionContent>
            <div className="first-content">
              <dl>
                <dt>
                  <span>01.</span>모든 여행 계획
                </dt>
                <dd>
                  함께할 여행의 장소, 참여자, 일정, 회계등
                  <strong>모든 항목을 한 눈에 파악</strong>할 수 있고
                  <strong>댓글</strong>을 통해 의견을 주고 받을 수 있어요.
                </dd>
              </dl>
              <ul>
                <li>
                  <img src={LandingImages.firstContent1} alt="firstContent1" />
                </li>
                <li>
                  <img src={LandingImages.firstContent2} alt="firstContent2" />
                </li>
              </ul>
            </div>

            <div className="second-content">
              <img src={LandingImages.secondContent} alt="secondContent" />
              <dl>
                <dt>
                  <span>02.</span>일정
                </dt>
                <dd>
                  팀 스페이스의 모든 팀원이 찜 목록의 여행지에서 가고 싶은 곳을
                  표시할 수 있고 일정 담당자는 찜 목록을 참고해
                  <strong>여행에 대한 모든 일정을 계획</strong>해요.
                </dd>
              </dl>
            </div>

            <div className="third-content">
              <dl>
                <dt>
                  <span>03.</span>예약
                </dt>
                <dd>
                  일정 담당자가 세운 일정 중 예약이 필요한 장소가 있다면, 예약
                  예정 항목에 자동으로 추가되며{" "}
                  <strong>예약이 필요한 항목과 완료한 항목</strong>을 한 눈에
                  확인할 수 있어요.
                </dd>
              </dl>
              <ul>
                <li>
                  <img src={LandingImages.thirdContent1} alt="thirdContent1" />
                </li>
                <li>
                  <img src={LandingImages.thirdContent2} alt="thirdContent2" />
                </li>
              </ul>
            </div>

            <div className="fourth-content">
              <ul>
                <li>
                  <img
                    src={LandingImages.fourthContent1}
                    alt="fourthContent1"
                  />
                </li>
                <li>
                  <img
                    src={LandingImages.fourthContent2}
                    alt="fourthContent2"
                  />
                </li>
                <li>
                  <img
                    src={LandingImages.fourthContent3}
                    alt="fourthContent3"
                  />
                </li>
              </ul>
              <dl>
                <dt>
                  <span>04.</span>회계
                </dt>
                <dd>
                  공동 경비를 설정하고 일자 별 지출 내역을 입력하면
                  <strong>자동으로 남은 금액을 계산</strong>해줘 편리하게 회계
                  관리가 가능해요.
                </dd>
              </dl>
            </div>
          </SixthSectionContent>
        </Container>
      </SixthSection>

      <SeventhSection>
        <Container>
          <SectionTitle position="left">
            <dt>PERSONAL SPACE</dt>
            <dd>
              나만의 <span>개인 스페이스</span>에서 준비물을
              <br />
              계획하고 확인할 수 있어요.
            </dd>
          </SectionTitle>
          <img src={LandingImages.seventhContent} alt="seventhContent" />
        </Container>
      </SeventhSection>

      <EighthSection>
        <dl>
          <dt>
            1초만에 회원가입하고 <span>여행역할</span> 나누기!
          </dt>
          <dd>여행역할 지금 바로 시작해보세요!</dd>
        </dl>
        <button onClick={() => navigate("/login")}>바로 시작하기</button>
      </EighthSection>
    </LandingWrap>
  );
};

export default Landing;
