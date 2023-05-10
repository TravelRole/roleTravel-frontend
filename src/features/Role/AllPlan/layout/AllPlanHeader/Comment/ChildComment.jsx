import React from "react";
import styled from "styled-components";
import dog from "../../../../../../assets/images/dog.jpeg";
import { HiDotsHorizontal } from "react-icons/hi";

const ChildCommentWrap = styled.div`
  padding: 1.4rem 1.4rem;
  border-top: 1px solid #d8e2f4;
  background-color: #f6f7fa;
`;

const ChildCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ChildCommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  dl {
    display: flex;
    gap: 2rem;
    align-items: center;
    dt {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      font-size: 1.8rem;
      color: #333;
      span {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    dd {
      font-size: 1.6rem;
      position: relative;
      color: #a7a7a7;

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: -1rem;
        transform: translateY(-50%);
        width: 0.2rem;
        height: 1rem;
        background-color: #dadada;
      }
    }
  }

  button {
    color: #69778f;
    border: none;
    background-color: transparent;
    font-size: 2rem;
    cursor: pointer;
  }
`;

const ChildCommentMain = styled.div`
  p {
    font-size: 1.6rem;
    color: #707070;
  }
`;

const ChildCommentFooter = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  li {
    font-size: 1.4rem;

    &:first-child {
      color: #c4c4c4;
    }
    &:last-child {
      cursor: pointer;
      text-decoration: underline;
      color: #8b8b8b;
    }
  }
`;

const ChildComment = () => {
  return (
    <ChildCommentWrap>
      <ChildCommentContainer>
        <ChildCommentHeader>
          <dl>
            <dt>
              <span>
                <img src={dog} alt="프로필임시사진" />
              </span>
              유해찬
            </dt>
            <dd>예약</dd>
          </dl>
          <button>
            <HiDotsHorizontal />
          </button>
        </ChildCommentHeader>

        <ChildCommentMain>
          <p>좋은듯?</p>
        </ChildCommentMain>

        <ChildCommentFooter>
          <li>2023.03.01 10:09</li>
          <li>답글</li>
        </ChildCommentFooter>
      </ChildCommentContainer>
    </ChildCommentWrap>
  );
};

export default ChildComment;
