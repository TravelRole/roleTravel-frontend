import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, InputContainer, Content } from "./Styles";
// import { useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import Button from "../../../components/Button";
import { dateValidation, nameValidation } from './validation';
import useAddSlash from '../../../lib/useAddSlash';
import { useSelector } from "react-redux";

const Info = () => {
  const addSlash = useAddSlash();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ date: "", nickname: "" });
  const [errors, setErrors] = useState({ date: "", nickname: "" });


  let states = useSelector((state)=>{
    return state
  })
  
  console.log(states);

  const changeHandler = (e) => {
    const { value, name } = e.target;
    
    switch (name) {
      case "nickname" :
        const nameVal = nameValidation(value);
        if (nameVal.success) {
          setInputs({ ...inputs, nickname: value})
          setErrors({ ...inputs, nickname: ''})
        } else {
          setErrors({ ...inputs, nickname: nameVal.error})
        }
        return;
      case "date" :
        const dateVal = dateValidation(value);
        if (dateVal.success) {
          setInputs({ ...inputs, date: value})
          setErrors({ ...inputs, date: ''})
        } else {
          setErrors({ ...inputs, date: dateVal.error})
        }
        break;
      case "id":
      default:
        setErrors({ ...inputs, nickname: ''})
    }

  };

  const updateHandler = () => {
    console.log("수정이 완료되었습니다!");
  };

  return (
    <Container marginTop="0px">
      <Content>
        <h1>회원정보 수정</h1>
        <div width="46px">
          <p>회원님의 정보를 수정/확인 하실 수 있습니다.</p>
        </div>
      </Content>
      <Content>
        <InputContainer>
          <TextField
            fullWidth
            name="id"
            value={"asdf@asdf.com"}
            onChange={changeHandler}
            InputProps={{
              readOnly: true,
            }}
            helperText={" "}
          />
        </InputContainer>
        <InputContainer>
          <TextField
            fullWidth
            name="nickname"
            label="닉네임"
            value={inputs.nickname}
            onChange={changeHandler}
            error={errors.nickname.length > 0}
            helperText={errors.nickname ? errors.nickname : " "}
          />
        </InputContainer>
        <InputContainer>
          <TextField
            fullWidth
            name="date"
            label="생년월일"
            value={addSlash(inputs.date)}
            onChange={changeHandler}
            error={errors.date.length > 0}
            helperText={errors.date ? errors.date : " "}
          />
        </InputContainer>
      </Content>
      <Content>
        <Button
          size="small"
          onClick={() => navigate("/home")}
          color="stroke"
        >
          취소
        </Button>
        <Button
          size="small"
          onClick={updateHandler}
          color="blue"
        >
          수정하기
        </Button>
      </Content>
    </Container>
  );
};

export default Info;
