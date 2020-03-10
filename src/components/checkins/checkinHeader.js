import React from 'react';
import { Row, Col, Layout } from 'antd';

const { Header } = Layout;

function CheckinHeader(props) {
  return (
    <Header className="checkin-header">
      <Row align="middle" gutter={[8]} justify="space-between">
        <Col xs={24} md={16}>
          bro
        </Col>
      </Row>
    </Header>
  );
}

export default CheckinHeader;
