import React from "react";
import styled from "@emotion/styled";

function Content() {
  return <ContentWrapper></ContentWrapper>;
}

export default Content;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: clamp(640px, 43vh, 1000px);
  background-image: url(/images/background.png);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;
