import React from 'react';
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
            <Row align="middle" gutter={[8]} justify="space-between">

                        <Col xs={18}>
                            <Searchbar />
                        </Col>
                        <Col xs={6}>
                            <UserHeader />
                        </Col>


            </Row>
            <div className="logoContainer" />

        </Header>
    );
}

export default MainHeader;
