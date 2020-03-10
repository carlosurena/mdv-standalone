import React, { useState } from 'react';
import { Row, Col } from 'antd';
import ContainerPanel from '../common/containerPanel';

function Checkins() {
  return (
    <Row gutter={[16, 16]} className="container-padding">
      <ContainerPanel size={3} title="Checkins">
        checkinsssssssssss
      </ContainerPanel>

      <ContainerPanel size={2} title="Active Members">
        this is a test
      </ContainerPanel>
    </Row>
  );
}

export default Checkins;
