import { useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { Container, Content, InputContainer } from "./Styles";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import { Visibility, VisibilityOff } from "@mui/icons-material";


const ChangePassword = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState({ password: false, confirm: false})
  const [pw, setPW] = useState({ password: '', forConfirm: '', now: ''});
  const [errors, setErrors] = useState({
    password: '',
    forConfirm: '',
    now: '',
  })

  const changeHandler = (e) => {
    const {value, name} = e.target;
    setPW({...pw, [name]: value})
  };
  
  const updateHandler = () => {
    if (pw.password !== pw.forConfirm) {
      setErrors({ ...errors, forConfirm: '비밀번호가 일치하지 않습니다.'})
    }
    console.log('수정이 완료되었습니다!')
  };

  return (
    <Container>
      <Content marginTop="0px">
        <h1>비밀번호 변경</h1>
        <div width="76px">
          <p>비밀번호는 8~16자 영문, 숫자, 특수문자를 사용할 수 있습니다.</p>
          <p>비밀번호는 <span style={{ color: '#3884FD', fontSize: '1.7rem'}}>주기적(최소 6개월)</span>으로 변경해 주시기 바랍니다.</p>
        </div>
      </Content>
      <Content>
        <InputContainer>
          <TextField
            fullWidth
            name="now"
            label="현재 비밀번호"
            value={pw.now}
            onChange={changeHandler}
            maxLength={11}
            error={errors.now.length > 0}
            helperText={errors.now ? errors.now : " "}
            />
        </InputContainer>
        <InputContainer>
          <TextField
            fullWidth
            name="password"
            label="새 비밀번호"
            value={pw.password}
            onChange={changeHandler}
            maxLength={11}
            error={errors.password.length > 0}
            helperText={errors.password ? errors.password : " "}
            type={show.password ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShow({...show, password: !show.password})}>
                  {show.password ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
            />
        </InputContainer>
        <InputContainer>
          <TextField
            fullWidth
            name="confirm"
            label="비밀번호 확인"
            value={pw.forConfirm}
            onChange={changeHandler}
            maxLength={11}
            error={errors.forConfirm.length > 0}
            helperText={errors.forConfirm ? errors.forConfirm : " "}
            type={show.confirm ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShow({...show, confirm: !show.confirm})}>
                  {show.confirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
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
  )
};

export default ChangePassword;