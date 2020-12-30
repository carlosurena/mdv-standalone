import React from "react";
import ContainerPanel from "../common/containerPanel";
import PersonDataModal from "./personDataModal";
import {
  Button,
  Descriptions,
  Tabs,
  PageHeader,
  Popconfirm,
  message
} from "antd";
import moment from "moment";
import { colors } from "../common/theme";

const { TabPane } = Tabs;

function InfoPanel(props) {
  const {
    setModalVisibility,
    modalVisibility,
    personData,
    refetchData,
    updatePerson,
    deletePerson
  } = props;

  function confirm(e) {
    console.log(e);
    deletePerson(personData.person_id);
    message.success("Person Deleted.");
  }

  function cancel(e) {
    console.log(e);
  }

  return (
    <div className="roundify" style={{ backgroundColor: colors.white }}>
      <Tabs type="card">
        <TabPane tab="Basic" key="1">
          <ContainerPanel size={3}>
            <Button
              onClick={() => {
                setModalVisibility(true);
                console.log("modal open");
              }}
            >
              Edit
            </Button>
            <PersonDataModal
              mode="edit"
              data={personData}
              modalVisibility={modalVisibility}
              setModalVisibility={setModalVisibility}
              refetchData={refetchData}
              updatePerson={updatePerson}
            />
            <Descriptions title="Basic">
              <Descriptions.Item label="Name">
                {personData.first_name +
                  " " +
                  (personData.middle_name && personData.middle_name) +
                  " " +
                  personData.last_name}{" "}
              </Descriptions.Item>
              {personData.birthdate ? (
                <Descriptions.Item label="Birthday">
                  {moment.utc(personData.birthdate).format("MMMM Do")}
                </Descriptions.Item>
              ) : null}

              {personData.gender ? (
                <Descriptions.Item label="gender">
                  {personData.gender}
                </Descriptions.Item>
              ) : null}

              {personData.address ? (
                <Descriptions.Item label="Address">
                  {personData.address}
                </Descriptions.Item>
              ) : null}
              {personData.city ? (
                <Descriptions.Item label="City">
                  {personData.city}
                </Descriptions.Item>
              ) : null}

              {personData.state ? (
                <Descriptions.Item label="state">
                  {personData.state}
                </Descriptions.Item>
              ) : null}

              {personData.allergies ? (
                <Descriptions.Item label="Allergies">
                  {personData.allergies}
                </Descriptions.Item>
              ) : null}

              {personData.nickname ? (
                <Descriptions.Item label="Nickname">
                  {personData.nickname}
                </Descriptions.Item>
              ) : null}
            </Descriptions>

            <Descriptions title="Contact">
              {personData.phone ? (
                <Descriptions.Item label="Phone">
                  {personData.phone}
                </Descriptions.Item>
              ) : null}
              {personData.email ? (
                <Descriptions.Item label="Email">
                  {personData.email}
                </Descriptions.Item>
              ) : null}
            </Descriptions>

            <Descriptions title="Other">
              {personData.grade ? (
                <Descriptions.Item label="Grade">
                  {personData.grade}
                </Descriptions.Item>
              ) : null}

              {personData.member_type ? (
                <Descriptions.Item label="Member Type">
                  {personData.member_type}
                </Descriptions.Item>
              ) : null}
            </Descriptions>
          </ContainerPanel>
        </TabPane>
        <TabPane tab="Personal" key="2">
          <div>
            <PageHeader title="Personal Information" />
          </div>
        </TabPane>
        <TabPane tab="Permissions" key="3">
          <div>
            <PageHeader title="User Permissions" />

            <Popconfirm
              title="Are you sure delete this task? This cannot be undone."
              onConfirm={confirm}
              onCancel={cancel}
              okText="Confirm Delete"
              cancelText="No"
            >
              <Button danger>Delete this person</Button>
            </Popconfirm>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default InfoPanel;
