import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Form, Input, Switch, DatePicker, Select } from 'antd';
import { ManOutlined, WomanOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import moment from 'moment';

const dateFormat = 'MM/DD/YYYY';

const mockEvents = [
  {
    key: 'PowerKids Sunday School',
    label: 'PowerKids Sunday School'
  },
  {
    key: 'PowerKids Wednesday',
    label: 'PowerKids Wednesday'
  },
  {
    key: 'Dscipleship Wednesday',
    label: 'Massachussets'
  }
];

function CheckinsOptionsModal(props) {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const [checkinsValues, setCheckinsValues] = useState({
    event_type: 'PowerKids Sunday School',
    event_date: new Date()
  });
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
            console.log('api req here');
            history.push('/check-ins/station');
          })
          .then(() => form.resetFields())
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal" initialValues={null}>
        <Input.Group>
          <Row gutter={8}>
            <Col xs={24} sm={12}>
              <Form.Item name="event_type" label="Event">
                <Select
                  placeholder="Event"
                  defaultValue={checkinsValues.event_type}
                  onChange={e => {
                    console.log('event change');
                  }}
                >
                  {mockEvents &&
                    mockEvents.map(event => {
                      return (
                        <Option key={event.key} value={event.key} label={event.label}>
                          {event.label}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="date" label="Event Date">
                <DatePicker
                  defaultValue={moment(checkinsValues.event_date)}
                  format={dateFormat}
                  onChange={e => {
                    console.log('date change');
                  }}
                  className="center"
                />
              </Form.Item>
            </Col>
          </Row>
        </Input.Group>
        <Input.Group>
          <Row gutter={8}>
            <Col xs={24} sm={8}></Col>
            <Col xs={24} sm={8}></Col>

            <Col xs={24} sm={8}></Col>
          </Row>
        </Input.Group>

        <div>
          <Row justify="center">
            <Col xs={24}></Col>
          </Row>
        </div>
      </Form>
    </Modal>
  );
}

export default CheckinsOptionsModal;
