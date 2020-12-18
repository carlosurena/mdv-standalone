import React, { useState } from 'react';
import CheckinSearchbar from './CheckinSearchbar';
import { Button, Row, Col } from 'antd';
import { colors } from '../common/theme';
import ContainerPanel from '../common/containerPanel';
function CheckinContent(props) {
  const [filteredOptions, setFilteredOptions] = useState([]);

  const updateSearchResults = filteredOptions => {
    setFilteredOptions(filteredOptions)
  }

  const handleCreateAttendee = async (id) => {
      props.createAttendee(id);
  }

  const handleDeleteAttendee = async (personId) => {
    console.log(filteredOptions)
    console.log(props.attendees, personId)
    const attendeeToDelete = props.attendees && props.attendees.find( attendee => parseInt(attendee.person_id) === personId);

    if (attendeeToDelete){
      props.deleteAttendee(attendeeToDelete.entry_id, attendeeToDelete.sheet_id);
    }else{
      console.log("could not find entry to delete")
    }

}

  return (
    <Row gutter={[16, 16]} justify="center">
      <Col className="checkin-content" xs={24} md={16}>
        <Row gutter={[16, 16]} align="middle" justify="center">
          <ContainerPanel background={colors.limeGreen} noPadding size={1}>
            <Button
              onClick={() => {
                props.setModalVisibility(true);
              }}
              className="dashButton"
              type="link"
              block
              size="large"
            >
              Event
              </Button>
          </ContainerPanel>

        </Row>
        <Row align="middle" justify="center">
          <Col>
            <ContainerPanel background={colors.limeGreen}>{props.attendees.length} Registered Check-ins</ContainerPanel>
          </Col>
        </Row>
        <Row>
          <Col xs={24} md={16}>
            list of registered ppl
            {
              props.attendees && props.attendees.map(attendee => {
                return (
                  <div id={attendee.attendee_id}>
                    {attendee.first_name} {attendee.last_name} {attendee.person_id}
                  </div>
                )
              })
            }
          </Col>
        </Row>
        <Row align="middle" justify="center">
          <Col xs={24} md={16}>
            {filteredOptions && filteredOptions.map(person => {
              return (
                <Row id={person.person_id} gutter={[16]}>
                  <Col xs={8}>
                    {
                      (props.attendees && props.attendees.filter(a => a.person_id === person.person_id)).length > 0 ? 
                        (<Button loading={props.loading} onClick={() => handleDeleteAttendee(person.person_id)}>DELETE</Button>) : 
                        (<Button loading={props.loading} onClick={() => handleCreateAttendee(person.person_id)}>Add</Button>)
                    }
                  </Col>
                  <Col>{person.first_name && person.first_name} {person.middle_name && person.middle_name} {person.last_name && person.last_name}</Col>
                </Row>
              )
            })}
          </Col>
        </Row>
        <Row align="middle" justify="center">
          <Col>
            <CheckinSearchbar updateSearchResults={updateSearchResults} mode="checkin" />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default CheckinContent;
