import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';
import ContainerPanel from "../common/containerPanel";
import { Table, Row, Col, Button, Modal } from "antd";
import CreatePersonModal from "./createPersonModal";
import { PlusOutlined } from "@ant-design/icons";
import { colors } from "../common/theme";
const columns = [
  {
    title: "First Name",
    dataIndex: "first_name",
    key: "first_name",
    sorter: (a, b) => a.first_name.length - b.first_name.length,
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "Last Name",
    dataIndex: "last_name",
    key: "last_name",
    sorter: (a, b) => a.last_name.length - b.last_name.length,
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    sorter: (a, b) => a.gender.length - b.gender.length,
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone"
  }
];

function People() {
  const [response, setResponse] = useState("");
  const [statusMsg, setStatusMsg] = useState("retrieving..");
  const [modalVisibility, setModalVisibility] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setModalVisibility(false);
    const res = await fetch("/api/people");
    res
      .json()
      .then(res => {
        setStatusMsg("done!");
        setResponse(res);
      })
      .catch(err => {
        setStatusMsg(
          "There was an error retrieving the data. Please try again."
        );
      });
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={0} md={16}></Col>
        <ContainerPanel noPadding background={colors.red} size={1}>
          <Button
            onClick={() => setModalVisibility(true)}
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
        <CreatePersonModal
          modalVisibility={modalVisibility}
          setModalVisibility={setModalVisibility}
          fetchData={fetchData}
        />
        {statusMsg}
        {response && <Table dataSource={response} columns={columns} />}
      </ContainerPanel>
    </>
  );
}

export default People;
