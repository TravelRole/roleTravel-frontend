import { useState } from "react";
import styled from "styled-components";
// import { validation } from './validation';
import { useNavigate } from "react-router-dom";
import { Button, Container, Input, InputContainer, Content } from "./Styles";
import { useDispatch } from "react-redux";

const Info = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [date, setDate] = useState({ year: "", month: "", date: "" });

  const changeHandler = (e) => {
    const { value, name } = e.target;
    if (name === "nickname") {
      setNickname(value);
    } else if (name === "year") {
      setDate({ ...date, year: value });
    } else if (name === "month") {
      setDate({ ...date, month: value });
    } else if (name === "date") {
      setDate({ ...date, date: value });
    }
  };

  const updateHandler = () => {
    console.log("수정이 완료되었습니다!");
  };

  return (
    <Container>
      <Content>
        <h1>회원정보 수정</h1>
        <div width="46px">
          <p>회원님의 정보를 수정/확인 하실 수 있습니다.</p>
        </div>
      </Content>
      <Content>
        <InputContainer>
          {/* <Label width="80px">아이디</Label> */}
          <Input readOnly defaultValue={"asdf@adsf.com"} />
        </InputContainer>
        <InputContainer>
          {/* <Label width="80px">이름 (별명)</Label> */}
          <Input
            name="nickname"
            value={nickname}
            onChange={changeHandler}
            placeholder="닉네임"
          />
        </InputContainer>
        <InputContainer>
          {/* <Label width="80px">생년월일</Label> */}
          <Input
            maxLength={4}
            name="year"
            value={date.year}
            onChange={changeHandler}
            placeholder="생년월일"
          />
        </InputContainer>
      </Content>
      <Content>
        <Button
          onClick={() => navigate("/home")}
          backgroundColor="#FAFAFA"
          color="black"
          border="1px solid #C4C4C4"
        >
          취소
        </Button>
        <Button
          onClick={updateHandler}
          backgroundColor="#3884FD"
          color="white"
          border="none"
        >
          수정하기
        </Button>
      </Content>
    </Container>
  );
};

export default Info;
