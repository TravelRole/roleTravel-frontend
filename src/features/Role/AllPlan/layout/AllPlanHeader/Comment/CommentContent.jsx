import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import ParentComment from "./ParentComment";
import { useDispatch, useSelector } from "react-redux";
import { addParentComment, getCommentList } from "../../../commentSlice";
import { useParams } from "react-router-dom";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import Pagination from "react-js-pagination";

const CommentContentWrap = styled.div`
  padding: 0 1.8rem 1.4rem 1.8rem;
  border-radius: 0px 0px 1.6rem 1.6rem;
  background-color: #fff;
  width: 100%;
`;

const CommentContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentsWrap = styled.div`
  border-bottom: 1px solid #dadada;
  border-top: 1px solid #dadada;
  margin-bottom: 1.6rem;
  height: 52.1rem;
  overflow-y: scroll;
`;

const NotCommentWrap = styled.dl`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  dt {
    font-size: 3.5rem;
    color: #3884fd;
    margin-bottom: 2rem;
  }

  .not-comment-title {
    font-size: 2.2rem;
    color: #333;
    font-weight: 500;
    margin-bottom: 1.7rem;
  }

  .not-comment-content {
    font-size: 1.6rem;
    text-align: center;
    color: #c4c4c4;
    line-height: normal;
  }
`;

const PaginationWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3.3rem;
  ul {
    display: flex;
    gap: 1.5rem;
    align-items: center;

    li {
      a {
        font-size: 1.4rem;
        color: #cfcfcf;

        svg {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      &.disabled {
        a {
          color: #dadada;
        }
      }

      &.active {
        a {
          color: #333;
        }
      }
    }

    .comment-prev-btn,
    .comment-next-btn {
      color: #8b8b8b;
      font-size: 2rem;
    }
  }
`;

const AddCommentWrap = styled.form`
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    p {
      font-size: 1.4rem;
      color: #8b8b8b;
    }
    button {
      border: none;
      background-color: transparent;
      font-size: 1.2rem;
      color: #8b8b8b;
      text-decoration: underline;
      cursor: pointer;
    }
  }

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

    &::placeholder {
      color: #c4c4c4;
    }
  }

  p {
    text-align: right;
    color: #a7a7a7;
    font-size: 1.2rem;
  }
`;

const CommentContent = ({ openComment }) => {
  const textareaRef = useRef(null);
  const [commentValue, setCommentValue] = useState("");
  const [selectPage, setSelectPage] = useState(1);
  const { commentList, pageInfo } = useSelector((state) => state.comment);
  const { totalSize } = pageInfo;
  const dispatch = useDispatch();
  const { roomId } = useParams();

  const handlePageChange = useCallback(
    (page) => {
      setSelectPage(page);
      const getData = { roomId: roomId, page: page - 1 };
      dispatch(getCommentList(getData));
    },
    [dispatch, roomId]
  );

  const TEXTAREA_MAX = 100;

  // textarea 높이 자동 조절
  const handleResizeHeight = useCallback(() => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Reset height to auto
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, []);

  // 100자 이내만 작성할 수 있게 해주는 함수
  const onChangeComment = useCallback((e) => {
    const { value } = e.target;
    if (value.length <= TEXTAREA_MAX) {
      setCommentValue(value);
    }
  }, []);

  // 부모 댓글 추가하는 함수
  const onSubmitParentComment = useCallback(
    (e) => {
      e.preventDefault();
      const data = { roomId: roomId, content: commentValue };
      const getData = { roomId: roomId, page: selectPage - 1 };
      dispatch(addParentComment(data)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          dispatch(getCommentList(getData));
          setCommentValue("");
        }
      });
    },
    [commentValue, dispatch, roomId, selectPage]
  );

  return (
    <CommentContentWrap>
      <CommentContentContainer>
        <CommentsWrap>
          {commentList.length > 0 ? (
            commentList.map((data, index) => (
              <ParentComment key={data.id} selectPage={selectPage} {...data} />
            ))
          ) : (
            <NotCommentWrap>
              <dt>
                <HiOutlineChatBubbleLeftRight />
              </dt>
              <dd className="not-comment-title">의견이 비어있어요!</dd>
              <dd className="not-comment-content">
                일정 계획을 보고 추가하거나 수정하고
                <br />
                싶은 부분이 있다면 댓글을 작성해보세요!
              </dd>
            </NotCommentWrap>
          )}
        </CommentsWrap>
        <PaginationWrap>
          <Pagination
            activePage={selectPage}
            itemsCountPerPage={5}
            totalItemsCount={totalSize}
            pageRangeDisplayed={3}
            firstPageText={""}
            lastPageText={""}
            prevPageText={<HiChevronLeft />}
            nextPageText={<HiChevronRight />}
            linkClassPrev={"comment-prev-btn"}
            linkClassNext={"comment-next-btn"}
            onChange={handlePageChange}
          />
        </PaginationWrap>

        <AddCommentWrap onSubmit={onSubmitParentComment}>
          <div>
            <p>의견 작성하기</p>
            <button type="submit">등록</button>
          </div>
          <textarea
            ref={textareaRef}
            placeholder="추가하거나 수정하고 싶은 의견을 작성해주세요"
            rows={1}
            value={commentValue}
            onInput={handleResizeHeight}
            onChange={onChangeComment}
            maxLength={100}
          />
          <p>
            {commentValue.length}/{TEXTAREA_MAX}
          </p>
        </AddCommentWrap>
      </CommentContentContainer>
    </CommentContentWrap>
  );
};

export default CommentContent;
