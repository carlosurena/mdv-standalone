import React, { useState } from 'react';
import { Avatar, Row, Col, Menu, Dropdown } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const style = {
    maxWidth : '110px'
}
function UserHeader() {

    const menu = (
        <Menu>
            <Menu.Item key="0">
                <Link>Settings</Link>
            </Menu.Item>
            <Menu.Item key="1">
                <Link>Log Out</Link>
            </Menu.Item>

        </Menu>
    )
    return (
        <Dropdown overlay={menu} trigger={['click']}>

            <Row style={style}>
                <Col xs={24} sm={12}>
                    <Avatar size="large" icon={<UserOutlined />} />
                </Col>
                <Col xs={0} sm={12}>
                    <Link className="ant-dropdown-link">Carlos <DownOutlined /></Link>

                </Col>
            </Row>
        </Dropdown>

    );
}

export default UserHeader
