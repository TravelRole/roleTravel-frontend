import { useState } from "react";
import { Container, Content, Input, InputContainer, Label } from "./Styles";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TextField } from "@mui/material";
import Button from "../../../components/Button";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [pw, setPW] = useState({ password: "", forConfirm: "" });

  const changeHandler = (e) => {
    const { value, name } = e.target;
    if (name === "password") {
      setPW({ ...pw, password: value });
    } else if (name === "confirm") {
      setPW({ ...pw, forConfirm: value });
    }
  };

  const updateHandler = () => {
    console.log("수정이 완료되었습니다!");
  };

  return (
    <Container>
      <Content marginTop="-59px">
        <h1>비밀번호 변경</h1>
        <div width="76px">
          <p>비밀번호는 8~16자 영문, 숫자, 특수문자를 사용할 수 있습니다.</p>
          <p>
            비밀번호는{" "}
            <span style={{ color: "#3884FD" }}>주기적(최소 6개월)</span>으로
            변경해 주시기 바랍니다.
          </p>
        </div>
      </Content>
      <Content>
        <InputContainer>
          {/* <Label width="100px">현재 비밀번호</Label> */}
          <TextField
            fullWidth
            label="비밀번호"
            name="password"
            type="password"
            value={pw.password}
            onChange={changeHandler}
            placeholder="기존 비밀번호를 입력해주세요."
          />
        </InputContainer>
        <InputContainer>
          {/* <Label width="100px">새로운 비밀번호</Label> */}
          <TextField
            fullWidth
            type="password"
            label="새로운 비밀번호"
            name="confirm"
            value={pw.forConfirm}
            onChange={changeHandler}
            placeholder="새로운 비밀번호를 입력해주세요."
          />
        </InputContainer>
      </Content>
      <Content>
        <Button onClick={() => navigate("/home")} color="stroke" size="small">
          취소
        </Button>
        <Button onClick={updateHandler} color="blue" size="small">
          수정하기
        </Button>
      </Content>
    </Container>
  );
};

export default ChangePassword;
