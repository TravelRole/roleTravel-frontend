import {
  ModalWrapper,
  Header,
  Body,
  Footer,
  Title,
  AddEssentialSpan,
  Button,
} from "./Styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createEssentials, getEssentials } from "../../EssentialsSlice";
import Category from "./layout/Category";
import Form from "./layout/Form";
import { convertCategoryName } from "./validation";
import { useSelector } from "react-redux";
import Modal from "../../../../../components/Modal";
import { toast } from "react-toastify";

const AddEssentialsModal = ({ setIsOpen, setData }) => {
  const dispatch = useDispatch();
  const [clickedCategory, setClickedCategory] = useState("");
  const [newEssential, setNewEssential] = useState("");
  const [newList, setNewList] = useState([]);
  const { essentials } = useSelector((state) => state.essentials)

  const submitHandler = () => {
    if (newList.length === 0) {
      toast.error('+ 버튼을 눌러 준비물을 추가해주세요.')
      return;
    }
    else {
      const convertCategory = convertCategoryName(clickedCategory);
      dispatch(
        createEssentials([
          Number(window.location.href.split("/")[3]),
          {
            category: convertCategory,
            items: newList,
          },
        ])
      ).then((res) => {
        dispatch(getEssentials(window.location.href.split("/")[3]));
        setData(essentials)
        setIsOpen(false);
      });
    }
  };

  return (
    <Modal setIsOpenModal={setIsOpen} width="38.2rem">
      <ModalWrapper>
        <Header>
          <Title>PACKING LIST</Title>
          <AddEssentialSpan color="#333333" fontSize="2.4rem" fontWeight="500">
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
          <Button color="blue" onClick={submitHandler}>
            확인
          </Button>
        </Footer>
      </ModalWrapper>
    </Modal>
  );
};

export default AddEssentialsModal;
