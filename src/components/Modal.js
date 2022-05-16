import React from "react";
import styled from "@emotion/styled";

function Modal({ clickModal, modal }) {
  return (
    <ModalWrapper modal={modal} onClick={clickModal}>
      <ModalContent src="/images/manual.png" />
    </ModalWrapper>
  );
}

export default Modal;

const ModalWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  inset: 0px;
  z-index: 50;
  cursor: pointer;
  display: ${(props) => (props.modal ? "block" : "none")};
`;

const ModalContent = styled.img`
  display: flex;
  margin: 400px auto;
`;
