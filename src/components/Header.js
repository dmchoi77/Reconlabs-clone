import React from "react";
import styled from "@emotion/styled";

function Header() {
  return (
    <HeaderWrapper>
      <BrandWrapper href="https://webapp.plicar.io/" target="_blank">
        <BrandLogo alt="logo" src="/images/logo.png" />
      </BrandWrapper>
    </HeaderWrapper>
  );
}

export default Header;

const HeaderWrapper = styled.header`
  height: 129px;
  display: flex;
  gap: 50px;
  align-items: center;
  justify-content: center;
`;

const BrandLogo = styled.img`
  // padding: 100px;
  width: 129px;
`;

const BrandWrapper = styled.a``;
