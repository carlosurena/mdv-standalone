import React, { useState } from 'react';
import { Row, Col } from 'antd';
import ContainerPanel from '../common/containerPanel';

function Settings() {
  return (
    <Row gutter={[16, 16]} className="container-padding">
      <ContainerPanel size={3} title="Attendance Over Time">
        Settings{' '}
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

export default Settings;
