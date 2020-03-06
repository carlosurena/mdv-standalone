import React, { useState } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Form,
  Input,
  InputNumber,
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

function CreatePersonModal(props) {
  const [personData, setPersonData] = useState({
    first_name: null,
    middle_name: null,
    last_name: null,
    gender: null,
    birthdate: null,
    email: null,
    address: null,
    city: null,
    state: null,
    phone: null,
    member_type: null,
    allergies: null,
    grade: null,
    nickname: null
  });

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [extraFields, toggleExtraFields] = useState(false);
  const [form] = Form.useForm();
  const { Option } = Select;
  const genderStyle = {
    backgroundColor:
      personData.gender && personData.gender === "M" ? "#1890ff" : "pink"
  };
  const resetState = () => {
    setPersonData({
      first_name: null,
      middle_name: null,
      last_name: null,
      gender: "F",
      birthdate: null,
      email: null,
      address: null,
      city: null,
      state: null,
      phone: null,
      member_type: null,
      allergies: null,
      grade: null,
      nickname: null
    });
    toggleExtraFields(false);
  };
  const handleCancel = () => {
    props.setModalVisibility(false);
    resetState();
    form.resetFields();
  };
  const handleSubmit = () => {
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
        setResponse(data.response);
        setLoading(false);
        props.setModalVisibility(false);
        props.fetchData();
        resetState();
      });
  };

  return (
    <Modal
      visible={props.modalVisibility}
      title="New Person"
      okText="Create"
      cancelText="Cancel"
      width="80%"
      onCancel={handleCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            handleSubmit();
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
        initialValues={{ modifier: "public" }}
      >
        <Input.Group>
          <Row gutter={8}>
            <Col xs={24} sm={8}>
              <Form.Item
                name="first_name"
                label="First name"
                rules={[{ required: true, message: "Missing first name " }]}
              >
                <Input
                  defaultValue={personData.first_name}
                  value={personData.first_name}
                  onChange={e => {
                    setPersonData({
                      ...personData,
                      first_name: e.target.value
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item name="middle_name" label="Middle name">
                <Input
                  value={personData.middle_name}
                  onChange={e => {
                    setPersonData({
                      ...personData,
                      middle_name: e.target.value
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                name="last_name"
                label="Last name"
                rules={[{ required: true, message: "Missing last name " }]}
              >
                <Input
                  value={personData.last_name}
                  onChange={e => {
                    setPersonData({
                      ...personData,
                      last_name: e.target.value
                    });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Input.Group>

        <Input.Group>
          <Row gutter={8}>
            <Col xs={24} sm={8}>
              <Form.Item name="birthdate" label="Birthdate">
                <DatePicker
                  value={personData.birthdate}
                  onChange={e => {
                    setPersonData({
                      ...personData,
                      birthdate: e.toDate()
                    });
                  }}
                  className="center"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item type="tel" name="phone" label="Phone #">
                <Input
                  value={personData.phone}
                  onChange={e => {
                    setPersonData({
                      ...personData,
                      phone: e.target.value
                    });
                  }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={8}>
              <Form.Item label="Gender">
                <Switch
                  defaultChecked="false"
                  checked={
                    personData.gender && personData.gender === "M"
                      ? true
                      : false
                  }
                  style={genderStyle}
                  checkedChildren={<ManOutlined />}
                  unCheckedChildren={<WomanOutlined />}
                  onChange={e => {
                    setPersonData({ ...personData, gender: e ? "M" : "F" });
                    console.log(personData);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Input.Group>

        <Input.Group>
          <Row gutter={8}>
            <Col xs={24} sm={12}>
              <Form.Item type="email" name="email" label="Email">
                <Input
                  value={personData.email}
                  onChange={e => {
                    setPersonData({
                      ...personData,
                      email: e.target.value
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="member_type" label="Member Type">
                <Select
                  placeholder="Member type"
                  value={personData.member_type}
                  onChange={e => {
                    setPersonData({
                      ...personData,
                      member_type: e
                    });
                  }}
                >
                  {mockMemberTypes &&
                    mockMemberTypes.map(member => {
                      return (
                        <Option
                          key={member.key}
                          value={member.key}
                          label={member.label}
                        >
                          {member.label}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Input.Group>

        {extraFields ? (
          <div>
            <Input.Group>
              <Row gutter={8}>
                <Col xs={24} sm={8}>
                  <Form.Item name="address" label="Address">
                    <Input
                      value={personData.address}
                      onChange={e => {
                        setPersonData({
                          ...personData,
                          address: e.target.value
                        });
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item name="city" label="City">
                    <Input
                      value={personData.city}
                      onChange={e => {
                        setPersonData({
                          ...personData,
                          city: e.target.value
                        });
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item name="state" label="State">
                    <Select
                      placeholder="State"
                      value={personData.state}
                      onChange={e => {
                        setPersonData({
                          ...personData,
                          state: e
                        });
                      }}
                    >
                      {mockStates &&
                        mockStates.map(state => {
                          return (
                            <Option
                              key={state.key}
                              value={state.key}
                              label={state.label}
                            >
                              {state.label}
                            </Option>
                          );
                        })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Input.Group>
            <Input.Group>
              <Row gutter={8}>
                <Col xs={24} sm={8}>
                  <Form.Item name="allergies" label="Allergies">
                    <Input
                      value={personData.allergies}
                      onChange={e => {
                        setPersonData({
                          ...personData,
                          allergies: e.target.value
                        });
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item name="grade" label="Grade">
                    <Select
                      placeholder="Grade"
                      value={personData.grade}
                      onChange={e => {
                        setPersonData({
                          ...personData,
                          grade: e
                        });
                      }}
                    >
                      {mockGrades &&
                        mockGrades.map(grade => {
                          return (
                            <Option
                              key={grade.key}
                              value={grade.key}
                              label={grade.label}
                            >
                              {grade.label}
                            </Option>
                          );
                        })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item name="nickname" label="Nickname">
                    <Input
                      value={personData.nickname}
                      onChange={e => {
                        setPersonData({
                          ...personData,
                          nickname: e.target.value
                        });
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Input.Group>
            <Row justify="center">
              <Col xs={24}>
                <Button
                  type="primary"
                  icon={<UpOutlined />}
                  shape="round"
                  className="center"
                  onClick={() => toggleExtraFields(false)}
                >
                  Less
                </Button>
              </Col>
            </Row>
          </div>
        ) : (
          <Row justify="center">
            <Col xs={24}>
              <Button
                type="primary"
                icon={<DownOutlined />}
                shape="round"
                className="center"
                onClick={() => toggleExtraFields(true)}
              >
                More
              </Button>
            </Col>
          </Row>
        )}
      </Form>
    </Modal>
  );
}

export default CreatePersonModal;
