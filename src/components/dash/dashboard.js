import React, { useState } from "react";
import { Row, Button } from "antd";
import { colors } from "../common/theme";
import ContainerPanel from "../common/containerPanel";
import UpcomingBirthdays from "./upcomingBirthdays";
import Demographics from "./demographics";
import Attendance from "./attendance";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import moment from "moment";

function Dashboard(props) {
  const history = useHistory();
  return (
    <Row gutter={[16, 16]} className="container-padding">

      <ContainerPanel background={colors.none} size={1} title="Hi Carlos!">
        {moment().format("dddd, MMMM Do, YYYY")}
      </ContainerPanel>

      <ContainerPanel background={colors.paleBlue} size={1} noPadding>
        <Button
          onClick={() => {
            props.setStation(true);
            history.push('/check-ins/station');
          }}
          icon={<ArrowRightOutlined />}
          className="dashButton"
          type="link"
          block
          size="large"
        >
          Start Attendance
        </Button>
      </ContainerPanel>

      <ContainerPanel background={colors.red} size={1} noPadding>
        <Button
          icon={<ArrowRightOutlined />}
          className="dashButton"
          type="link"
          block
          size="large"
        >
          Start Headcount
        </Button>
      </ContainerPanel>

      <ContainerPanel size={3} title="Attendance Over Time">
        <Attendance />
      </ContainerPanel>

      <ContainerPanel size={1} title="Active Members">
        Coming Soon...
      </ContainerPanel>

      <ContainerPanel size={1} title="Demographics">
          <Demographics />
      </ContainerPanel>

      <ContainerPanel size={1} title="Upcoming Birthdays">
        <UpcomingBirthdays />
      </ContainerPanel>
    </Row>
  );
}

export default Dashboard;
