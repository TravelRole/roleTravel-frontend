import React from "react";
import { SearchWrap } from "../../SearchIdPw";
import styled from "styled-components";
import { HiCheck } from "react-icons/hi";
import Button from "../../../../components/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const IdResultContainer = styled.div`
  width: 100%;
  max-width: 54rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 3rem;
  padding: 6rem 9.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  i {
    font-size: 5rem;
    color: #3884fd;
  }

  dl.idResult-header {
    text-align: center;
    dt {
      font-size: 3rem;
      margin-bottom: 1rem;
      span {
        font-size: 3rem;
        font-weight: 700;
      }
    }
    dd {
      font-size: 1.8rem;
      color: #9e9e9e;
    }
  }

  dl.idResult-content {
    width: 100%;
    padding: 3.9rem 0;
    text-align: center;
    background-color: #dfecff;
    border-radius: 0.8rem;
    border: 1px solid #ddd;
    dt {
      font-size: 2.1rem;
      margin-bottom: 1.5rem;
    }
    dd {
      font-size: 1.8rem;
      color: #828282;
    }
  }

  div {
    width: 100%;
    display: flex;
    gap: 1rem;
  }
`;

const SearchIdResult = () => {
  const { userId } = useSelector((state) => state.search);
  const navigate = useNavigate();
  return (
    <SearchWrap>
      <IdResultContainer>
        <i>
          <HiCheck />
        </i>
        <dl className="idResult-header">
          <dt>
            <span>아이디 찾기</span>가 완료되었습니다
          </dt>
          <dd>입력한 정보와 일치된 아이디입니다.</dd>
        </dl>
        <dl className="idResult-content">
          <dt>{userId}</dt>
          <dd>(2023/03/14)</dd>
        </dl>
        <div>
          <Button size="medium" color="blue" onClick={() => navigate("/login")}>
            로그인
          </Button>
          <Button
            size="medium"
            color="stroke"
            onClick={() => navigate("/searchIdPw")}
          >
            비밀번호 찾기
          </Button>
        </div>
      </IdResultContainer>
    </SearchWrap>
  );
};

export default SearchIdResult;
