import React from "react";
import styled from "styled-components";
import Icons from "../../../../assets/icon/icon";
import changeLanCategory from "../../Schedule/utils/changeLanCategory";
import { useDispatch } from "react-redux";
import { bookedReserveList, getReserveList } from "../reserveSlice";
import { useParams } from "react-router-dom";

const ReserveCell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  min-width: 56rem;
  padding: 2.4rem;
  margin-bottom: 2.1rem;
  border-radius: 1.6rem;
  background-color: white;
  box-shadow: 0px 5px 19px rgba(92, 119, 163, 0.1);
`;

const CellTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  input {
    appearance: none;
    border-radius: 50%;
    background-image: url("data:image/svg+xml,%3Csvg width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='11.5' cy='11.5' r='11' stroke='%23DADADA'/%3E%3C/svg%3E%0A");
    background-size: 80% 80%;
    background-position: 50%;
    background-repeat: no-repeat;
    width: 2.6rem;
    height: 2.6rem;
    cursor: pointer;

    &:checked {
      background-image: url("data:image/svg+xml,%3Csvg width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='11.5' cy='11.5' r='11' fill='%23EEF1F8' style='mix-blend-mode:multiply'/%3E%3Ccircle cx='11.5' cy='11.5' r='11' stroke='%233884FD'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.6947 7.29279C17.8822 7.48031 17.9875 7.73462 17.9875 7.99979C17.9875 8.26495 17.8822 8.51926 17.6947 8.70679L9.69471 16.7068C9.50718 16.8943 9.25288 16.9996 8.98771 16.9996C8.72255 16.9996 8.46824 16.8943 8.28071 16.7068L4.28071 12.7068C4.09855 12.5182 3.99776 12.2656 4.00004 12.0034C4.00232 11.7412 4.10749 11.4904 4.29289 11.305C4.4783 11.1196 4.72911 11.0144 4.99131 11.0121C5.25351 11.0098 5.50611 11.1106 5.69471 11.2928L8.98771 14.5858L16.2807 7.29279C16.4682 7.10532 16.7225 7 16.9877 7C17.2529 7 17.5072 7.10532 17.6947 7.29279Z' fill='%233884FD'/%3E%3C/svg%3E ");
      background-size: 80% 80%;
      background-position: 50%;
      background-repeat: no-repeat;
    }
  }

  label {
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    font-weight: 700;
    font-size: 20px;
    margin-left: 2rem;
    cursor: pointer;

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      right: -1rem;
      transform: translateY(-50%);
      width: 0.2rem;
      height: 1.4rem;
      background-color: #dadada;
    }
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 18px;
    margin-left: 2rem;
    color: #a7a7a7;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: white;
    position: absolute;
    right: 0;
    padding: 0 2.4rem 0 0;
    cursor: pointer;

    span,
    svg {
      font-size: 1.6rem;
      font-weight: 500;
      margin-right: 0.8rem;
      color: #a7a7a7;
    }
    svg {
      margin: 0;
    }
  }
`;

const CellDetail = styled.div`
  border-left: 0.2rem solid rgba(255, 199, 89, 1);
  margin: 1rem 0 1.5rem 1rem;
  padding: 1rem 0 1rem 2.4rem;
  padding-left: 2.4rem;

  ul {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    li {
      font-weight: 500;
      font-size: 1.5rem;
      color: #585858;
      a {
        font-size: 1.5rem;
      }
      span {
        margin-right: 2rem;
        font-weight: 600;
        font-size: 1.6rem;
        color: #a7a7a7;
      }
    }
    .time {
      color: #141414;
      font-weight: 600;
      font-size: 1.6rem;
    }
  }
`;

const CellReserveDetail = styled.div`
  padding-left: 1rem;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      font-weight: 600;
      font-size: 1.5rem;
      color: #333333;
      width: 50%;

      span {
        margin-right: 2rem;
        font-weight: 600;
        font-size: 1.6rem;
        color: #3884fd;
      }
    }

    .note {
      width: 100%;
      margin-top: 1.2rem;
    }
  }
`;

const ReserveCellLayout = ({ element, date, setIsOpenModal , setEditReserve}) => {

  const { roomId } = useParams();
  const {
    accountingEtc,
    accountingId,
    bookEtc,
    bookInfoId,
    category,
    isBooked,
    link,
    paymentMethod,
    placeName,
    price,
    time,
  } = element;

  const categoryName = changeLanCategory(category);
  const timeClock = time.slice(0, 5);

  const dispatch = useDispatch();

  const editBookInfo = {
    bookInfoId: bookInfoId,
    accountingInfoId: accountingId,
  }

  const bookingReserve = (e) => {

    let bookState = null;
    if (!e.target.checked) {
      bookState = true;
    } else {
      bookState = false;
    }

    const bookInfo = {
      bookInfoId: bookInfoId,
      accountingInfoId: accountingId,
      paymentTime: date,
      isBooked: bookState,
    };
    
    dispatch(bookedReserveList({ roomId, bookInfo })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(getReserveList({ roomId, date }));
      }
    });
  };

  return (
    <ReserveCell>
      <CellTitle>
        <input
          type="checkbox"
          onChange={bookingReserve}
          checked={isBooked && true}
        />
        <label htmlFor="placeName">{placeName}</label>
        <div>{categoryName}</div>
        <button onClick={() => {
          setIsOpenModal(true)
          setEditReserve(editBookInfo)
          }}>
          <span>수정하기</span> <Icons.FaChevronRight />{" "}
        </button>
      </CellTitle>
      <CellDetail>
        <ul>
          <li className="time">
            <span>시간</span>
            {timeClock}
          </li>
          <li>
            <span>링크</span>
            <a href={link} target="blank">
              {link}
            </a>
          </li>
          <li>
            <span>일정</span>
          </li>
        </ul>
      </CellDetail>
      <CellReserveDetail>
        <ul>
          <li>
            <span>금액</span>
            {price ? price : "금액을 추가해주세요"}
          </li>
          <li>
            <span>결제수단</span>
            {paymentMethod ? paymentMethod : "결제수단을 선택해주세요"}
          </li>
          <li className="note">
            <span>비고</span>
            {bookEtc ? bookEtc : "회계에서 남길 말을 작성해주세요"}
          </li>
        </ul>
      </CellReserveDetail>
    </ReserveCell>
  );
};

export default ReserveCellLayout;
