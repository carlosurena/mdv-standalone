import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Form,
  Input,
  Switch,
  DatePicker,
  Select
} from "antd";
import {
  ManOutlined,
  WomanOutlined,
  DownOutlined,
  UpOutlined
} from "@ant-design/icons";
import moment from "moment";

const dateFormat = "MM/DD/YYYY";

const mockStates = [
  {
    key: "CT",
    label: "Connecticut"
  },
  {
    key: "NY",
    label: "New York"
  },
  {
    key: "MA",
    label: "Massachussets"
  },
  {
    key: "NJ",
    label: "New Jersey"
  },
  {
    key: "RI",
    label: "Rhode Island"
  }
];

const mockGrades = [
  {
    key: "daycare",
    label: "Daycare"
  },
  {
    key: "pre-school",
    label: "Pre-School"
  },
  {
    key: "kindergarten",
    label: "Kindergarten"
  },
  {
    key: "1",
    label: "1st"
  },
  {
    key: "2",
    label: "2nd"
  },
  {
    key: "3",
    label: "3rd"
  },
  {
    key: "4",
    label: "4th"
  },
  {
    key: "5",
    label: "5th"
  },
  {
    key: "6",
    label: "6th"
  },
  {
    key: "7",
    label: "7th"
  },
  {
    key: "8",
    label: "8th"
  },
  {
    key: "9",
    label: "9th"
  },
  {
    key: "10",
    label: "10th"
  },
  {
    key: "11",
    label: "11th"
  },
  {
    key: "12",
    label: "12th"
  },
  {
    key: "college",
    label: "College"
  },
  {
    key: "graduated",
    label: "Graduated"
  },
  {
    key: "not_finished",
    label: "Did not Finish"
  }
];

const mockMemberTypes = [
  {
    key: "visitor",
    label: "Visitor"
  },
  {
    key: "frequent_visitor",
    label: "Frequent Visitor"
  },
  {
    key: "member",
    label: "Member"
  },
  {
    key: "active_member",
    label: "Active Member"
  },
  {
    key: "former_member",
    label: "Former Member"
  }
];

function CheckinsOptionsModal(props) {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { Option } = Select;

  const resetState = () => {};

  useEffect(() => {
    resetState();
  }, [props.data]);
  const handleCancel = () => {
    props.setModalVisibility(false);
    resetState();
    form.resetFields();
  };

  return (
    <Modal
      visible={props.modalVisibility}
      title="Start Attendance"
      okText="Start"
      cancelText="Cancel"
      width="80%"
      onCancel={handleCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            console.log("api req here");
          })
          .then(() => form.resetFields())
          .catch(info => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={null}
      >
        <Input.Group>
          <Row gutter={8}>
            <Col xs={24} sm={8}></Col>
            <Col xs={24} sm={8}></Col>
            <Col xs={24} sm={8}></Col>
          </Row>
        </Input.Group>
        <Input.Group>
          <Row gutter={8}>
            <Col xs={24} sm={8}></Col>
            <Col xs={24} sm={8}></Col>

            <Col xs={24} sm={8}></Col>
          </Row>
        </Input.Group>
        <Input.Group>
          <Row gutter={8}>
            <Col xs={24} sm={12}></Col>
            <Col xs={24} sm={12}></Col>
          </Row>
        </Input.Group>
        <div>
          <Input.Group>
            <Row gutter={8}>
              <Col xs={24} sm={8}></Col>
              <Col xs={24} sm={8}></Col>
              <Col xs={24} sm={8}></Col>
            </Row>
          </Input.Group>
          <Input.Group>
            <Row gutter={8}>
              <Col xs={24} sm={8}></Col>
              <Col xs={24} sm={8}></Col>
              <Col xs={24} sm={8}></Col>
            </Row>
          </Input.Group>
          <Row justify="center">
            <Col xs={24}></Col>
          </Row>
        </div>
      </Form>
    </Modal>
  );
}

export default CheckinsOptionsModal;
