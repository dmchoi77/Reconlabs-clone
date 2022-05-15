import React from "react";
import styled from "@emotion/styled";
import axios from "axios";

function SubContent() {
  async function downloadImage() {
    const response = await axios.get(
      "http://localhost:3000/images/qrcode.png",
      { responseType: "blob" }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "QR_CODE.jpg");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <SubContentWrapper>
      <Title>스마트폰을 통해 스캔 해주세요.</Title>
      <QRImage src="/images/qrcode.png" />
      <QRDesripttion>
        스마트폰 기본 카메라 앱에서 아래의 QR을 비춘 후 뜨는 링크를 눌러주세요
      </QRDesripttion>
      <DownloadButton
        type="button"
        value="QR코드 이미지 다운받기"
        onClick={downloadImage}
      />
      AR기능은 현재 아래의 기기에서만 정상 작동 합니다.
      <br />
      <br />
      iPhone: iOS 12이상
      <br />
      Android: 8.0+ 이상 ARCore 1.9 지원기기
    </SubContentWrapper>
  );
}

export default SubContent;

const SubContentWrapper = styled.div`
  width: 400px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 440px;
  text-align: center;
`;

const Title = styled.h2`
  text-align: center;
`;

const QRImage = styled.img`
  width: 220px;
  height: 220px;
`;

const QRDesripttion = styled.p`
  font-size: 1 rem;
  text-align: center;
`;

const DownloadButton = styled.input`
  background-color: #0071ff;
  color: #ffff;
  border: transparent;
  cursor: pointer;
  border-radius: 4px;
  padding: 8px;
  font-size: 14px;
`;
