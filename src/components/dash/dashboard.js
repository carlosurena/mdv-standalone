import React from 'react';
import { Row, Button } from 'antd';
import {colors} from '../common/theme'
import ContainerPanel from '../common/containerPanel';
import {ArrowRightOutlined} from '@ant-design/icons'
function Dashboard() {

    return (
        <Row gutter={[16, 16]}>
            <ContainerPanel background={colors.none} size={1} title="Hi Carlos!">
                this is a test
            </ContainerPanel>

            <ContainerPanel background={colors.paleBlue} size={1} noPadding >
            <Button icon={<ArrowRightOutlined />} className="dashButton" type="link" block size="large">Start Attendance</Button>
            </ContainerPanel>

            <ContainerPanel background={colors.red} size={1} noPadding>
            <Button icon={<ArrowRightOutlined />} className="dashButton" type="link" block size="large">Start Headcount</Button>
            </ContainerPanel>

            <ContainerPanel size={3} title="Attendance Over Time">
                this is a test
            </ContainerPanel>

            <ContainerPanel size={1} title="Active Members">
                this is a test
            </ContainerPanel>

            <ContainerPanel size={1} title="Demographics">
                this is a test
            </ContainerPanel>

            <ContainerPanel size={1} title="Upcoming Birthdays">
                this is a test
            </ContainerPanel>
        </Row>


    );
}

export default Dashboard;
