import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import View3D from "@egjs/view3d";
import Modal from "./Modal";
import "@egjs/view3d/css/view3d-bundle.min.css";
import names from "../names.json";

function Viewer() {
  const [modal, setModal] = useState(false);
  const modelList = [...names];
  const randomFIle = Math.floor(Math.random() * modelList.length);

  useEffect(() => {
    new View3D("#wrapper-el", {
      src: `/models/${modelList[randomFIle].name}.glb`,
      envmap: "/egjs-view3d/texture/artist_workshop_1k.hdr",
    });
  }, []);

  const clickModal = () => {
    setModal((value) => !value);
  };

  return (
    <ViewerWrapper>
      <ModalIcon onClick={clickModal}>ℹ️</ModalIcon>
      <ViewerContent>
        <div
          id="wrapper-el"
          className="view3d-wrapper view3d-square"
          style={{ minWidth: "720px" }}
        >
          <canvas
            className="view3d-canvas"
            style={{ minWidth: "720px", height: "380px" }}
          />
        </div>
      </ViewerContent>
      <Modal clickModal={clickModal} modal={modal} />
    </ViewerWrapper>
  );
}

export default Viewer;

const ViewerWrapper = styled.div`
  margin-top: 20px;
  min-width: 720px;
  height: 440px;
`;

const ViewerContent = styled.div`
  width: 100%;
  height: 380px;
  position: relative;
  overflow: hidden;
  background-color: #ffff;
  border-radius: 4px;
  box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
`;

const ModalIcon = styled.div`
  width: fit-content;
  float: right;
  cursor: pointer;
`;
