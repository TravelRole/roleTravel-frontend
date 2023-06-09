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
import {
  addAccountList,
  editAccountList,
  getAccountList,
} from "../accountSlice";
import changeLanCategory from "../../Schedule/utils/changeLanCategory";
import { getAllexpenses } from "../expensesSlice";
import CustomIcons from "../../../../assets/icon/customIcons";

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

      i {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 5rem;
        height: 4.8rem;
        svg {
          width: 100%;
          height: 100%;
        }
      }

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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 7rem;
    height: 7rem;
    background-color: ${(props) => (props.selected ? "#F4F6FB" : "#FFFFFF")};
    border: 1px solid ${(props) => (props.selected ? "#3884fd" : "#dadada")};
    border-radius: 0.8rem;
    margin-bottom: 0.8rem;

    i {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 5rem;
      height: 5rem;

      svg {
        width: 100%;
        height: 100%;
      }
    }
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

const AddEditAccountModal = ({
  setIsOpenModal,
  date,
  days,
  day,
  editPart,
  feeMethod,
  setDelNum,
}) => {
  useEffect(() => {
    if (editPart) {
      setPayment(editPart.paymentMethod);
      setFee(editPart.price);
      setCategory(changeLanCategory(editPart.category));
      setExpend(editPart.paymentName);
      setNote(editPart.accountingEtc);
      setIsEdit(true);
    }
  }, [
    editPart,
    editPart?.paymentMethod,
    editPart?.category,
    editPart?.paymentName,
    editPart?.accountingEtc,
    editPart?.price,
  ]);

  const dispatch = useDispatch();
  const { roomId } = useParams();

  const [payment, setPayment] = useState("CARD");
  const categoryOptions = [
    {
      category: "교통",
      activeIcon: <CustomIcons.TransPortBlueIcon />,
      defaultIcon: <CustomIcons.TransPortGrayIcon />,
    },
    {
      category: "숙박",
      activeIcon: <CustomIcons.StayBlueIcon />,
      defaultIcon: <CustomIcons.StayGrayIcon />,
    },
    {
      category: "음식",
      activeIcon: <CustomIcons.FoodBlueIcon />,
      defaultIcon: <CustomIcons.FoodGrayIcon />,
    },
    {
      category: "관광",
      activeIcon: <CustomIcons.TourBlueIcon />,
      defaultIcon: <CustomIcons.TourGrayIcon />,
    },
    {
      category: "쇼핑",
      activeIcon: <CustomIcons.ShoppingBlueIcon />,
      defaultIcon: <CustomIcons.ShoppingGrayIcon />,
    },
    {
      category: "기타",
      activeIcon: <CustomIcons.EtcBlueIcon />,
      defaultIcon: <CustomIcons.EtcGrayIcon />,
    },
  ];
  const [ncategory, setCategory] = useState("교통");
  const [note, setNote] = useState("");
  const [expend, setExpend] = useState("");
  const [fee, setFee] = useState("");

  const [isEdit, setIsEdit] = useState(false);

  const formatValue = (value = 0) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const transformedDate = date.split("-")[1] + "." + date.split("-")[2];

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
    if (isEdit) {
      const editaccountData = {
        accountingId: editPart?.id,
        paymentName: expend,
        paymentMethod: payment,
        price: Number(fee),
        category: changeLanCategory(ncategory),
        accountingEtc: note,
      };
      dispatch(
        editAccountList({ roomId, accountingId: editPart.id, editaccountData })
      ).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setIsEdit(false);
          dispatch(getAccountList({ roomId, date, feeMethod }));
          dispatch(getAllexpenses(roomId));
          setDelNum(undefined);
          setIsOpenModal(false);
          return;
        }
      });
    } else {
      const accountData = {
        paymentName: expend,
        paymentMethod: payment,
        paymentTime: date,
        price: Number(fee),
        category: changeLanCategory(ncategory),
        accountingEtc: note,
      };

      dispatch(addAccountList({ roomId, accountData })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setIsEdit(false);
          dispatch(getAccountList({ roomId, date, feeMethod }));
          dispatch(getAllexpenses(roomId));
          setDelNum(undefined);
          setIsOpenModal(false);
          return;
        }
      });
    }
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
                <dd>
                  {transformedDate}({day})
                </dd>
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
                  <i>
                    {payment === "CARD" ? (
                      <CustomIcons.CardBlueIcon />
                    ) : (
                      <CustomIcons.CardGrayIcon />
                    )}
                  </i>
                </li>
                <li
                  onClick={() => setPayment("CREDIT")}
                  className={payment === "CREDIT" ? "active" : null}
                >
                  현금
                  <i>
                    {payment === "CREDIT" ? (
                      <CustomIcons.CashBlueIcon />
                    ) : (
                      <CustomIcons.CashGrayIcon />
                    )}
                  </i>
                </li>
              </ul>
            </CardOrCashBox>
            <CategoryOptions>
              <span>카테고리</span>
              <ul>
              {categoryOptions.map((item) => {
                  return (
                    <CategoryWrap
                      selected={ncategory === item.category}
                      key={item.category}
                    >
                      <div onClick={() => setCategory(item.category)}>
                        <i>
                          {ncategory === item.category
                            ? item.activeIcon
                            : item.defaultIcon}
                        </i>
                      </div>
                      <span>{item.category}</span>
                    </CategoryWrap>
                  );
                })}
              </ul>
            </CategoryOptions>

            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-note">
                회계비고 입력란
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
