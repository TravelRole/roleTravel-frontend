import React, { useCallback, useState } from "react";
import styled from "styled-components";
import dog from "../../../../../../assets/images/dog.jpeg";
import { HiDotsHorizontal } from "react-icons/hi";
import AddChildComment from "./AddChildComment";
import ChildComment from "./ChildComment";
import { useDispatch } from "react-redux";
import { deleteComment, getCommentList } from "../../../commentSlice";
import { useParams } from "react-router-dom";
import moment from "moment";
import "moment/locale/ko";
moment.locale("ko");

const ParentCommentWrap = styled.div`
  border-top: 1px solid #d8e2f4;
  border-bottom: 1px solid #d8e2f4;
`;

const ParentCommentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.4rem 0;
  /* border-top: 1px solid #d8e2f4; */
  gap: 1rem;
`;

const ParentCommentHeader = styled.div`
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
      position: relative;
      display: flex;
      gap: 1rem;
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

      span {
        font-size: 1.6rem;
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

const ParentCommentEditMenu = styled.ul`
  position: absolute;
  right: 0;
  bottom: 1rem;
  padding: 1rem 1.5rem;
  border: 0.1rem solid #dadada;
  border-radius: 0.4rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  li {
    font-size: 1.2rem;
    color: #8b8b8b;
    cursor: pointer;
    text-decoration: underline;
  }
`;

const ParentCommentMain = styled.div`
  p {
    font-size: 1.6rem;
    color: #707070;
  }
`;

const ParentCommentFooter = styled.ul`
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
      color: #333;
    }
  }
`;

const ParentCommentDeleteWrap = styled.dl`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  dt {
    font-size: 1.4rem;
    font-weight: 300;
    color: #707070;
  }
  dd {
    font-size: 1.4rem;
    font-weight: 400;
    color: #c4c4c4;
  }
`;

const ParentComment = ({
  commentId,
  content,
  fromUserInfo,
  toUsername,
  createdDate,
  deleted,
}) => {
  const [openAddChildComment, setOpenAddChildComment] = useState(false);
  const [openEditMenu, setOpenEditMenu] = useState(false);
  const { roomId } = useParams();
  const parseCreatedDate = moment(createdDate).format("YYYY.MM.DD hh:mm");
  const dispatch = useDispatch();

  const handleDeleteParentComment = useCallback(() => {
    const data = { roomId: roomId, commentId: commentId };
    const getData = { roomId: roomId, page: 0 };
    dispatch(deleteComment(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(getCommentList(getData));
      }
    });
  }, [commentId, dispatch, roomId]);

  return (
    <ParentCommentWrap>
      <ParentCommentContainer>
        {deleted ? (
          <ParentCommentDeleteWrap>
            <dt>댓글이 삭제되었습니다.</dt>

            <dd>{parseCreatedDate}</dd>
          </ParentCommentDeleteWrap>
        ) : (
          <>
            <ParentCommentHeader>
              <dl>
                <dt>
                  <span>
                    <img src={fromUserInfo.profile} alt="프로필임시사진" />
                  </span>
                  {fromUserInfo.name}
                </dt>
                <dd>
                  {fromUserInfo.roles.map((role, index) =>
                    index === 0 || index === fromUserInfo.roles.length ? (
                      <span>{role}</span>
                    ) : (
                      <>
                        <span>&#183; {role}</span>
                      </>
                    )
                  )}
                </dd>
              </dl>
              <button
                onClick={() => {
                  setOpenEditMenu((prev) => !prev);
                }}
              >
                <HiDotsHorizontal />
              </button>
              {openEditMenu && (
                <ParentCommentEditMenu>
                  <li>댓글 수정</li>
                  <li onClick={handleDeleteParentComment}>댓글 삭제</li>
                </ParentCommentEditMenu>
              )}
            </ParentCommentHeader>

            <ParentCommentMain>
              <p>{content}</p>
            </ParentCommentMain>

            <ParentCommentFooter>
              <li>{parseCreatedDate}</li>
              <li
                onClick={() => {
                  setOpenAddChildComment((prev) => !prev);
                }}
              >
                답글
              </li>
            </ParentCommentFooter>
          </>
        )}
      </ParentCommentContainer>
      {openAddChildComment && <AddChildComment commentId={commentId} />}
      {/* <ChildComment /> */}
    </ParentCommentWrap>
  );
};

export default ParentComment;
