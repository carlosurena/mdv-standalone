import React from "react";
import { Col, PageHeader } from "antd";
import { colors } from "./theme";

function ContainerPanel(props) {
  const rootStyle = {
    backgroundColor: props.background ? props.background : colors.white
  };

  const descStyle = {
    padding: props.noPadding ? "0" : "16px 24px",
    display: "block",
    height: "100%"
  };

  return (
    <Col xs={24} lg={props.size * 8} offset={props.offset * 8}>
      <div style={rootStyle} className="containerPanel">
        {props.title ? <PageHeader title={props.title} /> : null}

        <div style={descStyle}>{props.children}</div>
      </div>
    </Col>
  );
}

export default ContainerPanel;
