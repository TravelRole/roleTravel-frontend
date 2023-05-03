import React, { useState } from "react";

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

const EditReserveModalWrapper = styled.div``;

const EditReserveHeader = styled.div`
  border-bottom: 0.1rem solid #e6e6e6;
  dl {
    padding: 2.6rem 2.4rem 1.7rem 2.4rem;
    dt {
      font-size: 1.6rem;
      color: #ffc759;
      font-family: "Unbounded", cursive;
      margin-bottom: 1.4rem;
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
    padding: 1.5rem 2.5rem 3.5rem 2.5rem;
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
  ul {
    display: flex;
    flex-direction: row;
    gap: 2rem;

    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 0.3rem;
      width: 8rem;
      height: 6rem;
      color: #c4c4c4;
      border: 1px solid #c4c4c4;
      border-radius: 0.8rem;

      cursor: pointer;
    }

    .active {
      color: #3884fd;
      border: 0.1rem solid #3884fd;
      box-shadow: 0 0.1rem 0.4rem 0.1rem #d9e6ff;
    }
  }
`;

const EditReserveModal = ({ setIsOpenModal }) => {
  const [payment, setPayment] = useState("card");
  const [note, setNote] = useState("");
  const [fee, setFee] = useState("");

  const noteMax = 30;

  const formatValue = (value) => {
    // 숫자 값을 쉼표로 구분하여 문자열로 변환
    if (value.length) setFee("");
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    switch (name) {
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

  const EditReserve = (e) => {
    e.preventDefault();
    console.log(payment, fee, note);
  };

  return (
    <EditReserveModalWrapper>
      <EditReserveHeader>
        <dl>
          <dt>Edit</dt>
          <dd>수정하기</dd>
        </dl>
      </EditReserveHeader>
      <EditReserveModalBody>
        <form onSubmit={EditReserve}>
          <div className="form-content">
            <p className="modal-body-text">결제수단</p>
            <CardOrCashBox>
              <ul>
                <li
                  onClick={() => setPayment("card")}
                  className={payment === "card" ? "active" : null}
                >
                  <Icons.AiOutlineCreditCard size={25} />
                  카드
                </li>
                <li
                  onClick={() => setPayment("cash")}
                  className={payment === "cash" ? "active" : null}
                >
                  <Icons.BiCoinStack size={25} />
                  현금
                </li>
              </ul>
            </CardOrCashBox>
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
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-note">
                비고를 입력하세요.
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-note"
                value={note}
                name="note"
                onChange={onChangeInput}
                endAdornment={
                  <InputAdornment position="end">
                    ({note.length}/{noteMax})
                  </InputAdornment>
                }
                label="비고를 입력하세요."
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

export default EditReserveModal;