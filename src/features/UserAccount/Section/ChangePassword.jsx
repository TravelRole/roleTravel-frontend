import { useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { Container, Content, InputContainer } from "./Styles";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { changePassword } from "../LoggedUserSlice";
import { toast } from "react-toastify";


const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { loggedInfo } =
  //   useSelector((state) => state.loggedUser);
  const [show, setShow] = useState({ password: false, newPassword: false})
  const [inputs, setInputs] = useState({ newPassword: '', password: ''});
  const [errors, setErrors] = useState({
    newPassword: '',
    password: '',
  })

  const changeHandler = (e) => {
    const {value, name} = e.target;
    if (value.length > 16) {
      setErrors({...errors, [name]: '* 16자를 넘을 수 없습니다.'})
    } else {
      setErrors({...errors, [name]: ''})
      setInputs({...inputs, [name]: value})
    }
  };
  
  const updateHandler = () => {
    const pattern = /^[a-zA-Z0-9-_!]{8,16}$/;

    if (!pattern.test(inputs.password)) {
      setErrors({...errors, password: '* 8~16자 영문, 숫자, 특수문자를 사용하세요.'})
      return;
    }

    if (!pattern.test(inputs.newPassword)) {
      setErrors({...errors, newPassword: '* 8~16자 영문, 숫자, 특수문자를 사용하세요.'})
      return;
    }

    dispatch(changePassword({
      password: inputs.password,
      newPassword: inputs.newPassword,
      newPasswordCheck: inputs.newPassword
    })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setTimeout(() => {
          toast.success('비밀번호 수정이 완료되었습니다.', {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            onClose: () => navigate('/:userId')
          });
        }, 1);
      } else {
        toast.error('올바르지 않은 정보입니다. 다시 확인해주세요.\n비밀번호는 (8~16자의 영문, 숫자, 특수기호(!), (_) (-) 만 사용 가능합니다.)');
      }
    })
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
            name="password"
            label="현재 비밀번호"
            value={inputs.password}
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
              maxLength: 16,
            }}
            />
        </InputContainer>
        <InputContainer>
          <TextField
            fullWidth
            name="newPassword"
            label="새 비밀번호"
            value={inputs.newPassword}
            onChange={changeHandler}
            maxLength={11}
            error={errors.newPassword.length > 0}
            helperText={errors.newPassword ? errors.newPassword : " "}
            type={show.newPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShow({...show, newPassword: !show.newPassword})}>
                  {show.newPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
              maxLength: 16,
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