import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
    HomeOutlined,
    UserOutlined,
    SettingOutlined,
    ProfileOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

function Nav(props) {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedItem] = useState(props.location.pathname);

    const handleSelectedRoute = (path) => {

        props.history.push(path)
    }
    return (
        <Sider theme="light" breakpoint="md" collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
            <Menu defaultSelectedKeys={[selectedItem]} mode="inline">
                <Menu.Item key="/" onClick={() => handleSelectedRoute("/")}>
                    <HomeOutlined />
                    <span>Home</span>
                </Menu.Item>

                <Menu.Item key="/people" onClick={() => handleSelectedRoute("/people")}>
                    <UserOutlined />
                    <span>People</span>
                </Menu.Item>

                <Menu.Item key="/check-ins" onClick={() => handleSelectedRoute("/check-ins")}>
                    <ProfileOutlined />
                    <span>Check-ins</span>
                </Menu.Item>

                <Menu.Item key="/settings" onClick={() => handleSelectedRoute("/settings")}>
                    <SettingOutlined />
                    <span>Settings</span>
                </Menu.Item>

            </Menu>
        </Sider>
    );
}

export default withRouter(Nav);
