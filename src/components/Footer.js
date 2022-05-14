import React from "react";
import styled from "@emotion/styled";

function Footer() {
  return (
    <FooterWrapper>
      Copyright 2022. RECON Labs Inc. All rights reserved.
    </FooterWrapper>
  );
}

export default Footer;

const FooterWrapper = styled.footer`
  margin-top: 200px;
  padding-top: 15px;
  height: 70px;
  border-top: 1px solid rgb(196, 196, 196);
  text-align: center;
  font-size: 1rem;
`;
