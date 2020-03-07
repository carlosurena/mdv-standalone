import React from "react";
import { Row, Col, PageHeader, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import moment from "moment";

function PersonHeaderPanel(props) {
  const { personData } = props;
  return (
    <Row align="middle">
      <Col xs={24} sm={8}>
        <Avatar
          className={personData.gender === "M" ? "male" : "female"}
          size={100}
          icon={<UserOutlined />}
        />
      </Col>
      <Col>
        <PageHeader
          className="noPadding"
          title={personData.first_name + " " + personData.last_name}
        />
        {personData.birthdate ? (
          <p>
            {moment().diff(moment(personData.birthdate), "years")} years old
          </p>
        ) : null}
        {personData.phone ? <p>{personData.phone}</p> : null}
      </Col>
    </Row>
  );
}
export default PersonHeaderPanel;
