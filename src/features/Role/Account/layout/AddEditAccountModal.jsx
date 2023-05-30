import React, { useEffect, useState } from "react";

import styled from "styled-components";
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

import Button from "../../../../components/Button";
import Icons from "../../../../assets/icon/icon";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addAccountList } from "../accountSlice";
import changeLanCategory from "../../Schedule/utils/changeLanCategory";

const EditReserveModalWrapper = styled.div``;

const EditReserveHeader = styled.div`
  border-bottom: 0.1rem solid #e6e6e6;
  dl {
    padding: 2.6rem 2.4rem 1.7rem 2.4rem;
    dt {
      font-size: 1.6rem;
      color: #ffc759;
      font-family: "Unbounded", cursive;
      margin-bottom: 0.4rem;
    }
    dd {
      font-size: 2.4rem;
    }
  }
`;

const EditReserveModalBody = styled.div`
  .form-content {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    padding: 1.6rem 2.5rem 3.5rem 2.5rem;
    border-bottom: 0.1rem solid #e6e6e6;
    p.modal-body-text {
      font-size: 1.6rem;
      color: #8b8b8b;
    }
  }

  .editReserveBtn {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    padding: 2rem 2.5rem;
  }
`;

const CardOrCashBox = styled.div`
  p {
    margin-bottom: 1rem;
  }
  ul {
    display: flex;
    flex-direction: row;
    gap: 2rem;

    li {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      gap: 0.3rem;
      width: 23rem;
      height: 7rem;
      padding: 1.5rem 1.7rem;

      font-size: 2rem;
      color: #c4c4c4;
      border: 1px solid #c4c4c4;
      border-radius: 0.8rem;

      cursor: pointer;
    }

    .active {
      color: #3884fd;
      background-color: #f4f6fb;
      border: 0.1rem solid #3884fd;
    }
  }
`;

const CategoryOptions = styled.div`
  width: 100%;
  span {
    font-weight: 500;
    font-size: 1.4rem;
    color: #8b8b8b;
  }
  ul {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin-top: 1rem;
  }
`;

const CategoryWrap = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  div {
    width: 7rem;
    height: 7rem;
    background-color: ${(props) => (props.selected ? "#F4F6FB" : "#FFFFFF")};
    border: 1px solid ${(props) => (props.selected ? "#3884fd" : "#dadada")};
    border-radius: 0.8rem;
    margin-bottom: 0.8rem;
  }
  span {
    color: ${(props) => (props.selected ? "#3884fd" : "#dadada")};
  }
`;

const DayDateBox = styled.div`
  dl {
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 2rem;

    dt {
      font-size: 1.8rem;
      font-weight: 600;
      position: relative;
      ::after {
        content: "";
        position: absolute;
        top: 50%;
        margin-left: 1rem;
        transform: translate(-50%, -50%);
        width: 0.2rem;
        height: 1rem;
        background-color: #d8e2f4;
      }
    }
    dd {
      font-size: 1.6rem;
    }
  }
`;

const AddEditAccountModal = ({ setIsOpenModal, date , days ,day}) => {
  const dispatch = useDispatch();
  const { roomId } = useParams();

  const [payment, setPayment] = useState("CARD");
  const categoryOptions = ["교통", "숙박", "음식", "관광", "쇼핑", "기타"];
  const [category, setCategory] = useState("교통");
  const [note, setNote] = useState("");
  const [expend, setExpend] = useState("");
  const [fee, setFee] = useState("");

  const formatValue = (value = 0) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const transformedDate =
  date.split("-")[1] + "." + date.split("-")[2];

  const noteMax = 30;

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "expend": {
        if (expend.length <= noteMax) setExpend(value);
        break;
      }
      case "fee": {
        const inputfeeValue = value;
        const parts = inputfeeValue.split(",");
        const newFeeValue = isNaN(parseInt(parts.join(""), 10))
          ? ""
          : parseInt(parts.join(""), 10);
        setFee(newFeeValue);
        break;
      }
      case "note": {
        if (value.length <= noteMax) setNote(value);
        break;
      }
      default:
        break;
    }
  };

  const addEditAccount = (e) => {
    e.preventDefault();
    const accountData = {
      paymentName: expend,
      paymentMethod: payment,
      paymentTime: date,
      price: Number(fee),
      category: changeLanCategory(category),
      etc: note,
    };

    dispatch(addAccountList({ roomId, accountData }));
  };

  return (
    <EditReserveModalWrapper>
      <EditReserveHeader>
        <dl>
          <dt>EXPENDITURE</dt>
          <dd>지출 내역 추가 및 수정</dd>
        </dl>
      </EditReserveHeader>

      <EditReserveModalBody>
        <form onSubmit={addEditAccount}>
          <div className="form-content">
            <DayDateBox>
              <dl>
                <dt>{days}일차</dt>
                <dd>{transformedDate}({day})</dd>
              </dl>
            </DayDateBox>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-expend">
                지출내역
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-expend"
                label="지출내역"
                name="expend"
                value={expend}
                onChange={onChangeInput}
                endAdornment={
                  <InputAdornment position="end">
                    ({expend?.length}/{noteMax})
                  </InputAdornment>
                }
              />
              <FormHelperText id="Edit-Reserve-Note-text">
                * 결제한 장소나 항목을 입력해주세요
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-reserve">금액</InputLabel>
              <OutlinedInput
                id="outlined-adornment-reserve"
                label="금액"
                name="fee"
                value={formatValue(fee)}
                onChange={onChangeInput}
                endAdornment={
                  <InputAdornment position="end">원</InputAdornment>
                }
              />
            </FormControl>

            <CardOrCashBox>
              <p className="modal-body-text">결제수단</p>
              <ul>
                <li
                  onClick={() => setPayment("CARD")}
                  className={payment === "CARD" ? "active" : null}
                >
                  카드
                  <Icons.AiOutlineCreditCard size={33} />
                </li>
                <li
                  onClick={() => setPayment("CREDIT")}
                  className={payment === "CREDIT" ? "active" : null}
                >
                  현금
                  <Icons.BiCoinStack size={33} />
                </li>
              </ul>
            </CardOrCashBox>
            <CategoryOptions>
              <span>카테고리</span>
              <ul>
                {categoryOptions.map((item) => {
                  return (
                    <CategoryWrap selected={category === item} key={item}>
                      <div onClick={() => setCategory(item)}></div>
                      <span>{item}</span>
                    </CategoryWrap>
                  );
                })}
              </ul>
            </CategoryOptions>

            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-note">
                비고를 입력하세요.
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-note"
                label="비고를 입력하세요."
                name="note"
                value={note}
                onChange={onChangeInput}
                endAdornment={
                  <InputAdornment position="end">
                    ({note?.length}/{noteMax})
                  </InputAdornment>
                }
              />
              <FormHelperText id="Edit-Reserve-Note-text">
                * 최대 30자까지 입력 가능합니다.
              </FormHelperText>
            </FormControl>
          </div>
          <div className="editReserveBtn">
            <Button
              className="cancelBtn"
              type="button"
              color="stroke"
              size="small"
              onClick={() => {
                setIsOpenModal(false);
              }}
            >
              취소
            </Button>
            <Button
              className="submitBtn"
              type="submit"
              color="blue"
              size="small"
            >
              완료
            </Button>
          </div>
        </form>
      </EditReserveModalBody>
    </EditReserveModalWrapper>
  );
};

export default AddEditAccountModal;
