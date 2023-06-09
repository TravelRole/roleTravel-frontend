import styled from "styled-components";
import NotfoundImage from "../../assets/images/404.png";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const NotFoundWrap = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotFoundContainer = styled.div`
  text-align: center;
  img {
    width: 28rem;
    margin-bottom: 4rem;
  }
  dl {
    text-align: center;
    margin-bottom: 3.5rem;
    dt {
      font-size: 3.6rem;
      color: #141414;
      font-weight: 500;
      margin-bottom: 3.5rem;
    }
    dd {
      font-size: 2.2rem;
      color: #8b8b8b;
      line-height: 3.1rem;
    }
  }
  button {
    padding: 1.6rem 2.8rem;
    background-color: #3884fd;
    border-radius: 0.8rem;
    border: none;
    font-size: 1.8rem;
    color: #fff;
    cursor: pointer;
  }
`;

function NotFound() {
  const navigate = useNavigate();
  const onClickHome = useCallback(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/spaceList");
      return;
    }
    navigate("/");
  }, [navigate]);
  return (
    <NotFoundWrap>
      <NotFoundContainer>
        <img src={NotfoundImage} alt="notFound" />
        <dl>
          <dt>요청하신 페이지를 찾을 수 없습니다.</dt>
          <dd style={{ marginBottom: "1.5rem" }}>
            존재하지 않는 주소를 입력하셨거나,
            <br />
            요청하신 페이지에 접근이 불가능합니다.
          </dd>
          <dd>
            입력하신 주소가 정확한지 다시 한 번 확인해주세요
            <br />
            이용에 불편을 드려 죄송합니다.
          </dd>
        </dl>
        <button onClick={onClickHome}>홈으로 이동</button>
      </NotFoundContainer>
    </NotFoundWrap>
  );
}

export default NotFound;
