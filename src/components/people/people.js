import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';
import ContainerPanel from "../common/containerPanel";
import { Table, Row, Col, Button, Modal } from "antd";
import PersonDataModal from "./personDataModal";
import { PlusOutlined } from "@ant-design/icons";
import { colors } from "../common/theme";
import { useHistory } from "react-router-dom";
const columns = [
  {
    title: "First Name",
    dataIndex: "first_name",
    key: "first_name",
    sorter: (a, b) => {
      return a.first_name.localeCompare(b.first_name);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "Last Name",
    dataIndex: "last_name",
    key: "last_name",
    sorter: (a, b) => {
      return a.last_name.localeCompare(b.last_name);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    sorter: (a, b) => {
      return a.gender.localeCompare(b.gender);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone"
  }
];

function People(props) {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState("retrieving..");
  const [modalVisibility, setModalVisibility] = useState(false);
  let history = useHistory();
  useEffect(() => {
    fetchPeople();
  }, []);

  async function fetchPeople() {
    setModalVisibility(false);
    console.log("modal close");
    const res = await fetch("/api/people");
    res
      .json()
      .then(res => {
        setStatusMsg("done!");
        setLoading(false);
        setResponse(res);
      })
      .catch(err => {
        setStatusMsg(
          "There was an error retrieving the data. Please try again."
        );
        setLoading(false);
      });
  }
  const createPerson = personData => {
    setLoading(true);
    console.log("submitting");
    fetch(`/api/people`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(personData)
    })
      .then(
        response => response.json(),
        error => console.log("An error oocurred", error)
      )
      .then(data => {
        console.log(data);
        // setResponse(data.response);
        setLoading(false);
        setModalVisibility(false);
        console.log("modal close");
        fetchPeople();
      });
  };

  const onRowClick = record => {
    history.push("/people/" + record.person_id);
  };

  return (
    <div className="container-padding">
      <Row gutter={[16, 16]}>
        <Col xs={0} md={16}></Col>
        <ContainerPanel noPadding background={colors.red} size={1}>
          <Button
            onClick={() => {
              setModalVisibility(true);
            }}
            icon={<PlusOutlined />}
            className="dashButton"
            type="link"
            block
            size="large"
          >
            Person
          </Button>
        </ContainerPanel>
      </Row>
      <ContainerPanel size={3} title="People">
        <PersonDataModal
          mode="create"
          modalVisibility={modalVisibility}
          setModalVisibility={setModalVisibility}
          refetchData={fetchPeople}
          createPerson={createPerson}
        />

        <Table
          dataSource={response}
          loading={loading}
          columns={columns}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {
                onRowClick(record);
              }
            };
          }}
        />
      </ContainerPanel>
    </div>
  );
}

export default People;
