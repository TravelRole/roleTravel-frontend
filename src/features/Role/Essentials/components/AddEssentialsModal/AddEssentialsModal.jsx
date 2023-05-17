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
import { convertCategoryName } from "./validation";

const AddEssentialsModal = ({ setIsOpen, data, setData }) => {
  const dispatch = useDispatch();
  const [clickedCategory, setClickedCategory] = useState("");
  const [newEssential, setNewEssential] = useState("");
  const [newList, setNewList] = useState([]);

  const submitHandler = () => {
    if (newList.length === 0) return;
    else {
      const convertCategory = convertCategoryName(clickedCategory);
      dispatch(
        createEssentials([
          Number(window.location.href.split("/")[3]),
          {
            category: convertCategory,
            items: newList
          }
        ])
      );
      setIsOpen(false);
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
