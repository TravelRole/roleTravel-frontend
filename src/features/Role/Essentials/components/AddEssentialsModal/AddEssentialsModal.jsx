import {
  ModalWrapper,
  Blur,
  Header,
  Body,
  Footer,
  Title,
  AddEssentialSpan,
  Button
} from "./Styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createEssentials } from "../../EssentialsSlice";
import Category from "./layout/Category";
import Form from "./layout/Form";

const AddEssentialsModal = ({ setIsOpen }) => {
  const dispatch = useDispatch();
  const [clickedCategory, setClickedCategory] = useState("");
  const [newEssential, setNewEssential] = useState("");
  const [newList, setNewList] = useState([]);

  const submitHandler = () => {
    if (newList.length === 0) return;
    else {
      dispatch(createEssentials([window.location.href.split("/")[3], newList]));
    }
  };

  return (
    <>
      <Blur></Blur>
      <ModalWrapper>
        <Header>
          <Title>PACKING LIST</Title>
          <AddEssentialSpan
            color="#333333"
            fontSize="2.4rem"
            fontWeight="500"
          >
            준비물 내역 추가
          </AddEssentialSpan>
        </Header>
        <Body>
          <Category
            clickedCategory={clickedCategory}
            setClickedCategory={setClickedCategory}
            setNewEssential={setNewEssential}
            setNewList={setNewList}
          />
          <Form
            clickedCategory={clickedCategory}
            newList={newList}
            setNewList={setNewList}
            setNewEssential={setNewEssential}
            newEssential={newEssential}
            
          />
        </Body>
        <Footer>
          <Button onClick={() => setIsOpen(false)}>취소</Button>
          <Button
            color="blue"
            onClick={submitHandler}
          >
            확인
          </Button>
        </Footer>
      </ModalWrapper>
    </>
  );
};

export default AddEssentialsModal;
