import React from "react";
import { Global, css } from "@emotion/react";

const defaultStyle = css`
  height: clamp(1024px, 50%, 1280px);
  width: clamp(768px, 50%, 1920px);
`;

function GlobalStyle() {
  return <Global styles={defaultStyle} />;
}

export default GlobalStyle;
