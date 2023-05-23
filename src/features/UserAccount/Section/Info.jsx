import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, InputContainer, Content } from "./Styles";
import { TextField } from "@mui/material";
import Button from "../../../components/Button";
import { switched } from './validation';
import useAddSlash from '../../../lib/useAddSlash';
import { useDispatch, useSelector } from "react-redux";
import { updatedInfo } from "../LoggedUserSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Info = () => {
  const dispatch = useDispatch();
  const addSlash = useAddSlash();
  const navigate = useNavigate();
  const { loggedInfo } =
    useSelector((state) => state.loggedInUser);
  const [inputs, setInputs] = useState({ email: "", date: "", nickname: "", platform: '' });
  const [errors, setErrors] = useState({ date: "", nickname: "" });

  useEffect(() => {
    setInputs({
      email: loggedInfo?.email ? loggedInfo?.email : '',
      nickname: loggedInfo?.name ? loggedInfo?.name : '',
      date: loggedInfo?.birth ? loggedInfo?.birth : '',
      platform: loggedInfo?.provider ? loggedInfo?.provider : '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInfo])

  const changeHandler = (e) => {
    const { value, name } = e.target;
    const validation = switched(name, value);
    if (validation.success) {
      setErrors({...errors, [name]: ''})
      setInputs({...inputs, [name]: value})
    } else {
      setErrors({...errors, [name]: validation.error})
    }
  };

  const updateHandler = () => {
    dispatch(updatedInfo({name: inputs.nickname, birth: inputs.date}))
    .then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setTimeout(() => {
          toast.success('수정이 완료되었습니다.', {
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
        toast.error('수정에 실패하였습니다.');
      }
    })
  };

  return (
    <Container marginTop="0rem">
      <Content>
        <h1>회원정보 수정</h1>
        <div width="4.6remx">
          <p>회원님의 정보를 수정/확인 하실 수 있습니다.</p>
        </div>
      </Content>
      <Content>
        <InputContainer>
          <TextField
            fullWidth
            name="id"
            value={inputs.email}
            onChange={changeHandler}
            InputProps={{
              readOnly: true,
            }}
            sx={{ cursor: 'none'}}
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
            helperText={errors.nickname ? errors.nickname : ""}
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
            helperText={errors.date ? errors.date : ""}
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
