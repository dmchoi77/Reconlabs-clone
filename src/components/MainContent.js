import React, { useState } from "react";
import styled from "@emotion/styled";

function Content() {
  const [modal, setModal] = useState(false);

  function copyUrlToClipBoard() {
    // 클립보드 복사를 위해 Clipboard API 사용
    // 참고 https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("클립보드에 복사되었습니다.");
    });
  }

  function clickModal() {
    setModal((value) => !value);
  }

  return (
    <ContentWrapper>
      {modal ? (
        <Modal onClick={clickModal}>
          <ModalContent src="/images/manual.png" />
        </Modal>
      ) : null}
      <ViewerWrapper>
        <ModalIcon onClick={clickModal}>ℹ️</ModalIcon>
        <Viewer>Viewer</Viewer>
      </ViewerWrapper>
      <CopyButton
        type="button"
        value="코드 복사하기"
        onClick={copyUrlToClipBoard}
      />
    </ContentWrapper>
  );
}

export default Content;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(/images/background.png);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;
const ViewerWrapper = styled.div`
  margin-top: 20px;
  width: 720px;
  height: 440px;
`;

const Viewer = styled.div`
  width: 100%;
  height: 380px;
  // display: block;
  position: relative;
  overflow: hidden;
  background-color: #ffff;
  border-radius: 4px;
`;

const ModalIcon = styled.div`
  display: flex;
  flex-direction: row-reverse;
  cursor: pointer;
`;

const CopyButton = styled.input`
  background-color: #0071ff;
  color: #ffff;
  border: transparent;
  cursor: pointer;
  border-radius: 4px;
  padding: 8px;
  font-size: 14px;
  margin-bottom: 35px;
`;

const Modal = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  inset: 0px;
  z-index: 50;
  cursor: pointer;
`;

const ModalContent = styled.img`
  display: flex;
  margin: 400px auto;
`;
