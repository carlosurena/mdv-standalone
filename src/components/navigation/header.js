import React, { useState } from 'react';
import { Row, Col, Layout } from 'antd';
import Searchbar from './searchbar'
import UserHeader from './userHeader'
const { Header } = Layout;

const style = {
    backgroundColor: "white",
    padding: "0 24px"
}
function MainHeader() {

    return (
        <Header className="site-layout-background" style={style}>
            <Row align="middle">
                <Col xs={0} md={6}>
                    <div className="logoContainer"></div>
                </Col>
                <Col xs={24} md={18}>
                    <Row justify="space-between">
                        <Col xs={20} sm={19}>
                            <Searchbar />
                        </Col>
                        <Col xs={4} sm={5}>
                            <UserHeader />
                        </Col>
                    </Row>
                </Col>


            </Row>
            <div className="logoContainer" />

        </Header>
    );
}

export default MainHeader;
