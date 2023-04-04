import React, { useCallback } from "react";
import styled from "styled-components";

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalWrap = styled.div`
  width: 100%;
  max-width: 600px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 50px;
  background-color: #fff;
`;

const Modal = ({ setIsAddModal, children }) => {
  const onCloseModal = useCallback(() => setIsAddModal(false), []);
  // useMemo 로 변경
  return (
    <>
      <ModalBg onClick={onCloseModal} />
      <ModalWrap>{children}</ModalWrap>
    </>
  );
};

export default Modal;
