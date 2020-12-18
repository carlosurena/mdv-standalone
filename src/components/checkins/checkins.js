import React, { useState, useEffect } from 'react';
import { Row, Button, Input, Select } from 'antd';
import ContainerPanel from '../common/containerPanel';
const { Option } = Select;

function Checkins() {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState('retrieving..');

  const [eventName, setEventName] = useState('');
  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    console.log('fetchin...');
    const res = await fetch('/api/events');
    res
      .json()
      .then(res => {
        setStatusMsg('done!');
        setLoading(false);
        setEvents(res);
        console.log(res);
      })
      .catch(err => {
        setStatusMsg('There was an error retrieving the data. Please try again.');
        setLoading(false);
      });
  }

  const createEvent = eventName => {
    setLoading(true);
    console.log(JSON.stringify(eventName));
    const data = {
      event_name: eventName,
      recurring: 'Y',
      frequency: 'WEEKLY',
      day_of_week: 'SUN',
      time_of_day: '10AM' //switch to timestamp or keep as string?
    }
    fetch(`/api/events`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(
        events => events.json(),
        error => console.log("An error oocurred", error)
      )
      .then(data => {
        console.log(data);
        //setEvents(data.response);
        //setLoading(false);
        //setModalVisibility(false);
        //console.log("modal close");
        fetchEvents();
      });
  };

  const eventTab = (
    <div>
      <Select
        placeholder="Event"
        size="large"
        onChange={e => {
          console.log('event change');
        }}
      >
        {events &&
          events.map(event => {
            return (
              <Option key={event.event_id} value={event.event_name} label={event.event_name}>
                {event.event_name}
              </Option>
            );
          })}
      </Select>
      <Input
        value={eventName}
        onChange={e => {
          setEventName(e.target.value);
        }}
      />
      <Button onClick={() => createEvent(eventName)}>test</Button>
    </div >
  );
  return (
    <Row gutter={[16, 16]} className="container-padding">
      <ContainerPanel size={3} title="Checkins">
        checkinsssssssssss
      </ContainerPanel>

      <ContainerPanel size={2} title="Events">
        {loading ? statusMsg : eventTab}
      </ContainerPanel>
    </Row>
  );
}

export default Checkins;
