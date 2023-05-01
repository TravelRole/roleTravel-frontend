import React, { useCallback } from "react";
import styled from "styled-components";

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalWrap = styled.div`
  width: 100%;
  max-width: ${({ width }) => width};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 2rem 2rem rgba(0, 0, 0, 0.08),
    0px 0px 0.2rem rgba(0, 0, 0, 0.12);
  z-index: 20;
  border-radius: 1.6rem;
  background-color: #fff;
`;

const Modal = ({ setIsOpenModal, width, children }) => {
  const onCloseModal = useCallback(
    () => setIsOpenModal(false),
    [setIsOpenModal]
  );
  // useMemo 로 변경
  return (
    <>
      <ModalBg onClick={onCloseModal} />
      <ModalWrap width={width}>{children}</ModalWrap>
    </>
  );
};

export default Modal;
