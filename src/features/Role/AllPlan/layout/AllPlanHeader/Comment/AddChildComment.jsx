import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { addChildComment, getCommentList } from "../../../commentSlice";

const AddChildCommentWrap = styled.div`
  padding: 1.4rem 1.4rem;
  border-top: 1px solid #dadada;
  background-color: #f6f7fa;
`;

const AddChildCommentContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AddChildCommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    color: #8b8b8b;
    font-size: 1.4rem;
  }
  ul {
    display: flex;
    align-items: center;
    gap: 1.3rem;
    li {
      font-size: 1.2rem;
      color: #8b8b8b;
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const AddChildCommentMain = styled.div`
  position: relative;
  textarea {
    margin-bottom: 0.5rem;
    width: 100%;
    box-sizing: border-box;
    font-size: 1.6rem;
    padding: 0.8rem;
    color: #707070;
    border: 0.1rem solid #e6e6e6;
    border-radius: 0.8rem;
    outline: none;
    resize: none;
    overflow-y: hidden;
    height: 9.8rem;
  }

  label {
    position: absolute;
    bottom: 2rem;
    right: 1.4rem;
    font-size: 1.2rem;
    color: #a7a7a7;
  }
`;

const AddChildComment = ({
  commentId,
  setOpenAddChildComment,
  username,
  selectPage,
}) => {
  const textareaRef = useRef(null);
  const [commentValue, setCommentValue] = useState("");
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const TEXTAREA_MAX = 100;

  // 100자 이내만 작성할 수 있게 해주는 함수
  const onChangeComment = useCallback((e) => {
    const { value } = e.target;
    if (value.length <= TEXTAREA_MAX) {
      setCommentValue(value);
    }
  }, []);

  /** 자식 댓글 작성 취소하기 버튼 클릭시 발생하는 함수 **/
  const handleAddChildCommentCancel = useCallback(() => {
    setOpenAddChildComment(false);
  }, [setOpenAddChildComment]);

  // 부모 댓글 추가하는 함수
  const onSubmitChildComment = useCallback(
    (e) => {
      e.preventDefault();
      const data = {
        roomId: roomId,
        parentId: commentId,
        content: commentValue,
      };
      const getData = { roomId: roomId, page: selectPage - 1 };
      dispatch(addChildComment(data)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          dispatch(getCommentList(getData));
          setOpenAddChildComment(false);
          setCommentValue("");
        }
      });
    },
    [
      commentId,
      commentValue,
      dispatch,
      roomId,
      selectPage,
      setOpenAddChildComment,
    ]
  );
  return (
    <AddChildCommentWrap>
      <AddChildCommentContainer onSubmit={onSubmitChildComment}>
        <AddChildCommentHeader onSubmit={onSubmitChildComment}>
          <p>@{username}에게 답글 작성하기</p>
          <ul>
            <li onClick={handleAddChildCommentCancel}>취소</li>
            <li onClick={onSubmitChildComment}>등록</li>
          </ul>
        </AddChildCommentHeader>
        <AddChildCommentMain>
          <textarea
            type="text"
            id="child-comment-input"
            ref={textareaRef}
            rows={1}
            value={commentValue}
            onChange={onChangeComment}
            maxLength={100}
          />
          <label htmlFor="child-comment-input">
            {commentValue.length}/{TEXTAREA_MAX}
          </label>
        </AddChildCommentMain>
      </AddChildCommentContainer>
    </AddChildCommentWrap>
  );
};

export default AddChildComment;
