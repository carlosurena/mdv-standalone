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

function PersonDataModal(props) {
  const [personData, setPersonData] = useState({
    first_name: props.mode === "edit" ? props.data.first_name : null,
    middle_name: props.mode === "edit" ? props.data.middle_name : null,
    last_name: props.mode === "edit" ? props.data.last_name : null,
    gender: props.mode === "edit" ? props.data.gender : "F",
    birthdate: props.mode === "edit" ? props.data.birthdate : null,
    email: props.mode === "edit" ? props.data.email : null,
    address: props.mode === "edit" ? props.data.address : null,
    city: props.mode === "edit" ? props.data.city : null,
    state: props.mode === "edit" ? props.data.state : null,
    phone: props.mode === "edit" ? props.data.phone : null,
    member_type: props.mode === "edit" ? props.data.member_type : null,
    allergies: props.mode === "edit" ? props.data.allergies : null,
    grade: props.mode === "edit" ? props.data.grade : null,
    nickname: props.mode === "edit" ? props.data.nickname : null
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
      first_name: props.mode === "edit" ? props.data.first_name : null,
      middle_name: props.mode === "edit" ? props.data.middle_name : null,
      last_name: props.mode === "edit" ? props.data.last_name : null,
      gender: props.mode === "edit" ? props.data.gender : "F",
      birthdate: props.mode === "edit" ? props.data.birthdate : null,
      email: props.mode === "edit" ? props.data.email : null,
      address: props.mode === "edit" ? props.data.address : null,
      city: props.mode === "edit" ? props.data.city : null,
      state: props.mode === "edit" ? props.data.state : null,
      phone: props.mode === "edit" ? props.data.phone : null,
      member_type: props.mode === "edit" ? props.data.member_type : null,
      allergies: props.mode === "edit" ? props.data.allergies : null,
      grade: props.mode === "edit" ? props.data.grade : null,
      nickname: props.mode === "edit" ? props.data.nickname : null
    });
    toggleExtraFields(false);
  };

  useEffect(() => {
    resetState();
  }, [props.data]);
  const handleCancel = () => {
    props.setModalVisibility(false);
    resetState();
    form.resetFields();
  };
  const createPerson = () => {
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
        props.refetchData();
        resetState();
      });
  };

  const updatePerson = () => {
    setLoading(true);
    console.log("submitting");
    fetch("/api/people/" + props.data.person_id, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(personData)
    })
      .then(
        response => response.json(),
        error => console.log("An error oocurred", error)
      )
      .then(data => {
        console.log(data)
        //setResponse(data.response);
        console.log(response);
        setLoading(false);
        props.setModalVisibility(false);
        props.refetchData();
        resetState();
      });
  };

  return (
    <Modal
      visible={props.modalVisibility}
      title="New Person"
      okText={props.mode === "create" ? "Create" : "Update"}
      cancelText="Cancel"
      width="80%"
      onCancel={handleCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            props.mode === "create" ? createPerson() : updatePerson();
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
        initialValues={
          personData.birthdate && props.mode === "edit"
            ? { ...personData, birthdate: moment(personData.birthdate) }
            : { ...personData, birthdate: null }
        }
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
                  defaultValue={personData.middle_name}
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
                  defaultValue={personData.last_name}
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
                  defaultValue={moment(personData.birthdate, dateFormat)}
                  format={dateFormat}
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
                  defaultValue={personData.phone}
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
                  defaultChecked={
                    personData.gender && personData.gender === "M"
                      ? true
                      : false
                  }
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
                  defaultValue={personData.email}
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
                  defaultValue={personData.member_type}
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
                      defaultValue={personData.address}
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
                      defaultValue={personData.city}
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
                      defaultValue={personData.state}
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
                      defaultValue={personData.allergies}
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
                      defaultValue={personData.grade}
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
                      defaultValue={personData.nickname}
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

export default PersonDataModal;
