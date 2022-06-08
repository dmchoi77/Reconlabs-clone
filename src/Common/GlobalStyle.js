import React from "react";
import { Global, css } from "@emotion/react";

const defaultStyle = css`
  body {
    min-width: 768px;
    max-width: 1920px;

    min-height: 1024px;
    max-height: 1280px;
  }
`;

function GlobalStyle() {
  return <Global styles={defaultStyle} />;
}

export default GlobalStyle;
