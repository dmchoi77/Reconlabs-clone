import React from "react";
import { Global, css } from "@emotion/react";

const defaultStyle = css`
  * {
  }
`;

function GlobalStyle() {
  return <Global styles={defaultStyle} />;
}

export default GlobalStyle;
