import React from "react";
import styled from "@emotion/styled";
import Viewer from "./Viewer";

function Content() {
  function copyUrlToClipBoard() {
    // 클립보드 복사를 위해 Clipboard API 사용
    // 참고 https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("클립보드에 복사되었습니다.");
    });
  }

  return (
    <ContentWrapper>
      <Viewer />
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
