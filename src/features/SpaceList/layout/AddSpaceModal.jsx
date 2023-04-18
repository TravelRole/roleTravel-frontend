import React, { useCallback, useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import Button from "../../../components/Button";
import { toast } from "react-toastify";
import { addTravel, getTravelList } from "../travelSlice";
import { useDispatch } from "react-redux";

const AddModalWrap = styled.div`
  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 20px;
    text-align: center;
  }

  form {
    width: 100%;
    dl {
      width: 100%;
      display: flex;
      align-items: center;
      dt {
        width: 20%;
      }
      dd {
        width: 80%;
        input {
          padding: 10px 20px;
          width: 100%;
          border: none;
          outline: none;
          border-bottom: 1px solid #ddd;
          &::placeholder {
            font-size: 1rem;
          }
          &.react-datepicker-ignore-onclickoutside {
            cursor: pointer;
            &:focus {
              color: transparent;
              text-shadow: 0 0 0 black;
              outline: none;
            }
          }
        }
      }
    }
    button.submitBtn {
      margin-top: 20px;
      float: right;
    }
  }
`;

function formatDate(date) {
  const year = date?.getFullYear();
  const month = ("0" + (date?.getMonth() + 1)).slice(-2); // 월은 0부터 시작하기 때문에 1을 더해줍니다.
  const day = ("0" + date?.getDate()).slice(-2);

  return `${year}/${month}/${day}`;
}

const AddSpaceModal = ({ setIsAddModal }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    roomName: "",
    travelStartDate: "",
    travelEndDate: "",
    location: "",
  });

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const handleDateChange = (dates) => {
    const [start, end] = dates;

    // 선택한 기간이 8일 이상인 경우, 종료 날짜를 강제로 줄임
    if (start && end && (end - start) / (1000 * 60 * 60 * 24) >= 8) {
      const newEnd = new Date(start);
      newEnd.setDate(newEnd.getDate() + 7);
      setDateRange([start, newEnd]);
      const formatStart = formatDate(start);
      const formatEnd = formatDate(newEnd);
      setFormData((prev) => ({
        ...prev,
        travelStartDate: formatStart,
        travelEndDate: formatEnd,
      }));
      toast.warn("7일까지 선택 가능합니다.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      setDateRange(dates);
      const formatStart = formatDate(start);
      const formatEnd = formatDate(end);
      setFormData((prev) => ({
        ...prev,
        travelStartDate: formatStart,
        travelEndDate: formatEnd,
      }));
    }
  };

  const onChangeInput = useCallback((e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onAddTravelSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(addTravel(formData)).then((res) => {
        console.log(res);
        if (res.meta.requestStatus === "fulfilled") {
          setIsAddModal(false);
          dispatch(getTravelList());
          return;
        }
      });
    },
    [dispatch, formData, setIsAddModal]
  );

  return (
    <AddModalWrap>
      <h3>새 여행 만들기</h3>
      <form onSubmit={onAddTravelSubmit}>
        <dl>
          <dt>
            <label htmlFor="spaceName">여행 이름</label>
          </dt>
          <dd>
            <input
              type="text"
              name="roomName"
              placeholder="여행 이름을 입력해주세요."
              onChange={onChangeInput}
            />
          </dd>
        </dl>
        <dl>
          <dt>
            <label htmlFor="tripDate">여행 일자</label>
          </dt>
          <dd>
            <DatePicker
              placeholderText="여행 일자를 선택해주세요."
              selectsRange={true}
              selected={startDate}
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              dateFormat="yyyy/MM/dd"
              onChange={handleDateChange}
            />
          </dd>
        </dl>
        <dl>
          <dt>
            <label htmlFor="tripLocation">장소</label>
          </dt>
          <dd>
            <input
              type="text"
              name="location"
              placeholder="여행 장소를 입력해주세요."
              onChange={onChangeInput}
            />
            {/* <SearchLocationInput /> */}
          </dd>
        </dl>
        {/* <dl>
          <dt>
            <label htmlFor="tripMember">총 인원 수</label>
          </dt>
          <dd>
            <input
              type="number"
              id="tripMember"
              placeholder="인원 수를 입력해주세요."
            />
          </dd>
        </dl> */}

        <Button className="submitBtn" type="submit" color="blue" size="small">
          확인
        </Button>
      </form>
    </AddModalWrap>
  );
};

export default AddSpaceModal;
