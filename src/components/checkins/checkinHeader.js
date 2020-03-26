import React from "react";
import { Row, Col, Layout } from "antd";

const { Header } = Layout;

function CheckinHeader(props) {
  return (
    <Header className="checkin-header">
      <Row align="middle" gutter={[8]} justify="center">
        <Col xs={24} md={16}>
          <h1>Event Type</h1>
        </Col>
      </Row>
    </Header>
  );
}

export default CheckinHeader;
