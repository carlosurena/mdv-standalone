import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    HomeOutlined,
    UserOutlined,
    SettingOutlined,
    ProfileOutlined
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

function Nav(props) {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedItem, setSelectedItem] = useState("/");

    const handleSelectedRoute = (path) => {

        props.history.push(path)
    }
    return (
        <Sider theme="light" breakpoint="sm" collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
            <Menu defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" onClick={() => handleSelectedRoute("/")}>
                    <HomeOutlined />
                    <span>Home</span>
                </Menu.Item>

                <Menu.Item key="2" onClick={() => handleSelectedRoute("/people")}>
                    <UserOutlined />
                    <span>People</span>
                </Menu.Item>

                <Menu.Item key="3" onClick={() => handleSelectedRoute("/check-ins")}>
                    <ProfileOutlined />
                    <span>Check-ins</span>
                </Menu.Item>

                <Menu.Item key="4" onClick={() => handleSelectedRoute("/settings")}>
                    <SettingOutlined />
                    <span>Settings</span>
                </Menu.Item>

            </Menu>
        </Sider>
    );
}

export default withRouter(Nav);
