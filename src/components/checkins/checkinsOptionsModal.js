import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Form, Input, Switch, DatePicker, Select } from 'antd';
import { ManOutlined, WomanOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import moment from 'moment';

const dateFormat = 'MM/DD/YYYY';

function CheckinsOptionsModal(props) {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [eventName, setEventName] = useState(null);
  const [eventId, setEventId] = useState(null);
  const [eventDate, setEventDate] = useState(new Date);

  const [form] = Form.useForm();
  const { Option } = Select;

  const resetState = () => { };

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
      okButtonProps={{ disabled: (!eventDate || !eventName) ? true : false }}
      onCancel={handleCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            console.log(eventName, eventDate, props);
            props.setModalVisibility(false);
            props.getOrCreateSheet(eventName, moment(eventDate).format("YYYY-MM-DD").toString());
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
              <Form.Item name="event_name" label="Event">
                <Select
                  placeholder="Select Event..."
                  defaultValue={eventName ? eventName : null}
                  onChange={e => {
                    console.log('event change to ' + e);
                    setEventName(e)
                  }} 
                >
                  {props.events &&
                    props.events.map(event => {
                      return (
                        <Option key={event.event_id} value={event.event_name} label={event.event_name}>
                          {event.event_name}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="date" label="Event Date">
                <DatePicker
                  defaultValue={moment(eventDate)}
                  format={dateFormat}
                  onChange={e => {
                    setEventDate(e && e.toDate())
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
