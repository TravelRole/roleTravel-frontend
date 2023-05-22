import { useDispatch, useSelector } from "react-redux";
import { Emphasis } from "../EssentialsListModal/Style";
import {
  Blur,
  Button,
  Error,
  ModalWrapper,
  Section,
  Span,
  Title,
} from "./Style";

import { deleteEssentials, getEssentials } from "../../EssentialsSlice";

const CheckDeleteModal = ({ setIsOpen, deleteList, setDeleteList, setData }) => {
  const dispatch = useDispatch();
  const { essentials } = useSelector((state) => state.essentials)

  const deleteHandler = () => {
    if (deleteList.length === 0) return;
    else {
      dispatch(
        deleteEssentials([
          Number(window.location.href.split("/")[3]),
          {
            ids: deleteList,
          },
        ])
      ).then((res) => {
        dispatch(getEssentials(Number(window.location.href.split("/")[3])))
        setData(essentials);
      } 
      );

      setDeleteList([]);
      setIsOpen(false);
    }
  };

  return (
    <>
      <Blur></Blur>
      <ModalWrapper>
        <Section>
          <Error />
          <Title>
            선택하신 준비물 내역을 모두{" "}
            <Emphasis style={{ fontSize: "2rem" }}>삭제</Emphasis>하겠습니까?
          </Title>
          <Span>삭제 이후에는 내용 복구가 불가능합니다.</Span>
        </Section>
        <Section>
          <Button color="stroke" size="medium" onClick={() => setIsOpen(false)}>
            취소
          </Button>
          <Button color="blue" size="medium" onClick={() => deleteHandler()}>
            삭제하기
          </Button>
        </Section>
      </ModalWrapper>
    </>
  );
};

export default CheckDeleteModal;
