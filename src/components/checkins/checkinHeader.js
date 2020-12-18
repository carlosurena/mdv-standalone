import React from 'react';
import { Row, Col, Layout, Button } from 'antd';
import { LeftSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
const { Header } = Layout;

function CheckinHeader(props) {
  const history = useHistory();

  return (
    <div className="checkin-header">
      <Row align="middle" gutter={[8]} justify="center">
        <Col xs={24} md={16} className="center">
          <Row align="middle" gutter="16" justify="center">
            <Col>
              <Button
                className="header-button"
                onClick={() => history.goBack()}
                type="link"
                icon={<LeftSquareOutlined />}
                size="large"
                block="true"
              />
            </Col>
            <Col>
              <h1>{props.eventType}</h1>
              <h2>{props.eventDate}</h2>
            </Col>
            <Button className="header-button" type="link" icon={<PlusSquareOutlined />} size="large" block="true" />
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default CheckinHeader;
