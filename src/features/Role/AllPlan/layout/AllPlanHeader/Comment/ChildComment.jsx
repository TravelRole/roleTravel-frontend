import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { HiDotsHorizontal, HiOutlineChat } from "react-icons/hi";
import AddChildComment from "./AddChildComment";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  editComment,
  getCommentList,
} from "../../../commentSlice";
import userProfile from "../../../../../../assets/images/userProfile.png";
import { useParams } from "react-router-dom";
import moment from "moment";
import "moment/locale/ko";
moment.locale("ko");

const ChildCommentWrap = styled.div`
  border-top: 1px solid #dadada;
  background-color: #f6f7fa;
`;

const ChildCommentContainer = styled.div`
  position: relative;
  padding: 1.4rem 1.5rem;
  display: flex;
  gap: 1rem;
`;

const ChildCommentProfileImg = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
`;

const ChildCommentMain = styled.div`
  flex: 2;
  p {
    font-size: 1.6rem;
    color: #707070;
  }
`;

const ChildCommentMainTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  dl {
    display: flex;
    gap: 2rem;
    align-items: center;
    dt {
      font-size: 1.6rem;
      color: #333;
    }
    dd {
      position: relative;
      display: flex;
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

  i {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: transChild;
    width: 2.1rem;
    height: 2.1rem;
    color: #a7a7a7;
    cursor: pointer;

    svg {
      width: 100%;
      height: 100%;
    }
  }
`;

const ChildCommentEditMenu = styled.ul`
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

const ChildCommentMainContent = styled.div`
  margin-bottom: 1rem;
  .child-comment-edit-input {
    width: 100%;
    height: 7.7rem;
    border: 0.1rem solid #dadada;
    font-size: 1.6rem;
    color: #707070;
    outline: none;
    border-radius: 0.8rem;
    resize: none;
    padding: 1rem;
    box-sizing: border-box;
  }
  p {
    span {
      font-size: 1.6rem;
      color: #8b8b8b;
    }
    font-size: 1.6rem;
    color: #707070;
  }
`;

const ChildCommentFooter = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  li {
    font-size: 1.2rem;

    &:first-child {
      color: #c4c4c4;
    }
    &.add-child-comment-btn {
      width: 2.1rem;
      height: 2.1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #a7a7a7;
      svg {
        width: 100%;
        height: 100%;
      }
    }
    &.add-child-comment-active {
      color: #3884fd;
    }
    &.comment-edit-btns {
      display: flex;
      gap: 1rem;
      span {
        font-size: 1.4rem;
        color: #a7a7a7;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
`;

const ChildCommentDeleteWrap = styled.dl`
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

const ChildComment = ({
  commentId,
  content,
  createdDate,
  deleted,
  fromUserInfo,
  toUsername,
  selectPage,
}) => {
  const { user } = useSelector((state) => state.user);
  const [openAddChildComment, setOpenAddChildComment] = useState(false);
  const [openEditMenu, setOpenEditMenu] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(content);
  const { roomId } = useParams();
  const parseCreatedDate = moment(createdDate).format("YYYY.MM.DD hh:mm");
  const dispatch = useDispatch();

  /** 수정 메뉴에서 댓글 수정 누르면 발생하는 함수 **/
  const handleOpenEditChildComment = useCallback(() => {
    // 수정하는 edit 레이아웃으로 변경함
    setIsEdit(true);
    // 열려있는 수정 메뉴 닫기
    setOpenEditMenu(false);
  }, []);

  /** 수정하기 누르면 생기는 textarea onChange 함수 **/
  const onChangeEditTextarea = useCallback((e) => {
    setEditValue(e.target.value);
  }, []);

  /** 수정완료 버튼 누르면 발생하는 함수 (수정하는 이벤트) **/
  const handleEditChildComment = useCallback(() => {
    const data = { roomId: roomId, commentId: commentId, content: editValue };
    const getData = { roomId: roomId, page: selectPage - 1 };
    dispatch(editComment(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(getCommentList(getData));
        setOpenAddChildComment(false);
        setIsEdit(false);
      }
    });
  }, [commentId, selectPage, dispatch, editValue, roomId]);

  /** 수정 취소 눌렀을 때 발생하는 함수 **/
  const handleEditCancelChildComment = useCallback(() => {
    setIsEdit(false);
  }, []);

  const handleDeleteChildComment = useCallback(() => {
    const data = { roomId: roomId, commentId: commentId };
    const getData = { roomId: roomId, page: selectPage - 1 };
    dispatch(deleteComment(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(getCommentList(getData));
      }
    });
  }, [commentId, selectPage, dispatch, roomId]);
  return (
    <ChildCommentWrap>
      <ChildCommentContainer>
        {deleted ? (
          <ChildCommentDeleteWrap>
            <dt>댓글이 삭제되었습니다.</dt>

            <dd>{parseCreatedDate}</dd>
          </ChildCommentDeleteWrap>
        ) : (
          <>
            <ChildCommentProfileImg>
              <img
                src={
                  fromUserInfo.profile === null
                    ? userProfile
                    : fromUserInfo.profile
                }
                alt="프로필임시사진"
              />
            </ChildCommentProfileImg>
            <ChildCommentMain>
              <ChildCommentMainTitle>
                <dl>
                  <dt>{fromUserInfo.name}</dt>
                  <dd>
                    {fromUserInfo.roles.map((role, index) =>
                      index === 0 || index === fromUserInfo.roles.length ? (
                        <span key={index}>{role}&nbsp;</span>
                      ) : (
                        <span key={index}>&#183;&nbsp;{role}</span>
                      )
                    )}
                  </dd>
                </dl>
                {user.userId === fromUserInfo.id && (
                  <i
                    onClick={() => {
                      setOpenEditMenu((prev) => !prev);
                    }}
                  >
                    <HiDotsHorizontal />
                  </i>
                )}

                {openEditMenu && (
                  <ChildCommentEditMenu>
                    <li onClick={handleOpenEditChildComment}>댓글 수정</li>
                    <li onClick={handleDeleteChildComment}>댓글 삭제</li>
                  </ChildCommentEditMenu>
                )}
              </ChildCommentMainTitle>
              <ChildCommentMainContent>
                {isEdit ? (
                  <textarea
                    className="child-comment-edit-input"
                    defaultValue={content}
                    maxLength={100}
                    onChange={onChangeEditTextarea}
                  />
                ) : (
                  <p>
                    <span>@{toUsername}</span> {content}
                  </p>
                )}
              </ChildCommentMainContent>
              <ChildCommentFooter>
                <li>{parseCreatedDate}</li>
                {isEdit ? (
                  <li className="comment-edit-btns">
                    <span onClick={handleEditCancelChildComment}>수정취소</span>
                    <span onClick={handleEditChildComment}>수정완료</span>
                  </li>
                ) : (
                  <li
                    onClick={() => {
                      setOpenAddChildComment((prev) => !prev);
                    }}
                    className={
                      openAddChildComment
                        ? `add-child-comment-btn add-child-comment-active`
                        : "add-child-comment-btn"
                    }
                  >
                    <HiOutlineChat />
                  </li>
                )}
              </ChildCommentFooter>
            </ChildCommentMain>
          </>
        )}
      </ChildCommentContainer>
      {openAddChildComment && (
        <AddChildComment
          selectPage={selectPage}
          commentId={commentId}
          username={fromUserInfo.name}
          setOpenAddChildComment={setOpenAddChildComment}
        />
      )}
    </ChildCommentWrap>
  );
};

export default ChildComment;
