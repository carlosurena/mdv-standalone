import React, { useState } from 'react';
import { Row, Col } from 'antd';
import ContainerPanel from '../common/containerPanel';

function Dashboard() {

    return (
        <Row gutter={[16,16]}>
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
