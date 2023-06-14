import { useDispatch, useSelector } from "react-redux";
import { Emphasis } from "../EssentialsListModal/Style";
import { Button, Error, ModalWrapper, Section, Span, Title } from "./Style";
import Modal from "../../../../../components/Modal";
import { deleteEssentials, getEssentials } from "../../EssentialsSlice";
import { toast } from "react-toastify";

const CheckDeleteModal = ({
  setIsOpen,
  deleteList,
  setDeleteList,
  setData
}) => {
  const dispatch = useDispatch();
  const { essentials } = useSelector((state) => state.essentials);

  const deleteHandler = () => {
    if (deleteList.length === 0) return;
    else {
      dispatch(
        deleteEssentials([
          Number(window.location.href.split("/")[3]),
          {
            ids: deleteList
          }
        ])
      ).then((res) => {
        dispatch(getEssentials(Number(window.location.href.split("/")[3])));
        setData(essentials);
        toast.success(`${deleteList?.length}개의 준비물이 삭제되었습니다.`, {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
          });
      });

      setDeleteList([]);
      setIsOpen(false);
    }
  };

  return (
    <Modal
      width="41.8rem"
      setIsOpenModal={setIsOpen}
    >
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
          <Button
            color="stroke"
            size="medium"
            onClick={() => setIsOpen(false)}
          >
            취소
          </Button>
          <Button
            color="blue"
            size="medium"
            onClick={() => deleteHandler()}
          >
            삭제하기
          </Button>
        </Section>
      </ModalWrapper>
    </Modal>
  );
};

export default CheckDeleteModal;
