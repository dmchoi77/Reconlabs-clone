import React from "react";
import { Global, css } from "@emotion/react";

const defaultStyle = css`
  max-width: 1920px;
  min-width: 768px;
  height: clamp(1024px, 43vh, 1280px);
`;

function GlobalStyle() {
  return <Global styles={defaultStyle} />;
}

export default GlobalStyle;
