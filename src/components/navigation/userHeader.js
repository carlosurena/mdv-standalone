import React from "react";
import { Avatar, Row, Col, Menu, Dropdown } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const style = {
  maxWidth: "110px"
};
function UserHeader() {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a>Settings</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a>Log Out</a>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Row style={style}>
        <Col xs={24} sm={12}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Col>
        <Col xs={0} sm={12}>
          <a className="ant-dropdown-link">
            Carlos <DownOutlined />
          </a>
        </Col>
      </Row>
    </Dropdown>
  );
}

export default UserHeader;
