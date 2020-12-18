import React, { useState, useEffect } from 'react';
import CheckinHeader from './checkinHeader';
import CheckinContent from './checkinContent';
import CheckinsOptionsModal from './checkinsOptionsModal'
import { Button } from 'antd';
import moment from 'moment'

function CheckinStation() {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [eventName, setEventName] = useState('');
  const [events, setEvents] = useState(null);
  const [sheet, setSheet] = useState(null);
  const [eventId, setEventId] = useState('');
  const [attendees, setAttendees] = useState([]);
  const [eventDate, setEventDate] = useState(new Date);
  const [statusMsg, setStatusMsg] = useState(new Date);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
    if(!sheet)
      setModalVisibility(true);
  }, [sheet,attendees]);

  async function getOrCreateSheet(name, date) {
    console.log("GET OR CREATE SHEET")
    setEventDate(moment(date));
    const id = events.find(event => event.event_name === name).event_id;
    const res = await fetch('/api/sheetsByEventAndDate?eventId=' + id + '&date=' + date);
    res
      .json()
      //GET
      .then(existingSheet => {
        console.log(existingSheet);
        if (!existingSheet) {
          //sheet not found, create new sheet
          console.log("CREATE SHEET")

          const data = {
            event_id: id,
            sheet_date: date,
          }
          fetch(`/api/sheets`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
          })
            .then(
              sheets => sheets.json(),
              error => console.log("An error oocurred", error)
            )
            .then(newSheet => {
              console.log(newSheet);
              setSheet(newSheet);
              setAttendees([]);
              fetchEvents();
            });
        }else {
          setSheet(existingSheet)
          console.log("ATTENDEES AFTER GET SHEET ", existingSheet)
          setAttendees(existingSheet.attendees);

        }

        setStatusMsg('done!');
        setModalVisibility(false);

      })
      .catch(err => {
        setStatusMsg('There was an error retrieving the data. Please try again.');
        // setLoading(false);
      });
  }

  async function getSheetById(sheetId){
    console.log('fetchin... SHEET');
    const res = await fetch('/api/sheets/'+sheetId);
    res
      .json()
      .then(res => {
        //setStatusMsg('done!');
        //setLoading(false);
        setSheet(res);
        console.log("ATTENDEES AFTER GET SHEETbyID ", res)
        setAttendees(res.attendees);
        console.log(res);
      })
      .catch(err => {
        setStatusMsg('There was an error retrieving the data. Please try again.');
        // setLoading(false);
      });
  }

  async function fetchEvents() {
    const res = await fetch('/api/events');
    res
      .json()
      .then(res => {
        setStatusMsg('done!');
        setEvents(res);
      })
      .catch(err => {
        setStatusMsg('There was an error retrieving the data. Please try again.');
      });
  }

  async function createAttendee(personId, entryType = "ATTENDEE", headcount = 0) {
    console.log('creating attendee...');
    console.log(sheet)
    setLoading(true);
    const data = {
      sheet_id: sheet.sheet_id,
      entry_type: entryType,
      person_id: personId,
      headcount: headcount,
    }
    fetch(`/api/attendees`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(
        attendees => attendees.json(),
        error => console.log("An error oocurred", error)
      )
      .then(data => {
        console.log(data);
        getSheetById(sheet.sheet_id);
        setLoading(false);
      }).catch((err) =>{
        console.log(err);
        setLoading(false);
      });
  }

  const deleteAttendee = async (id, sheetId) => {
    setLoading(true);
    fetch(`/api/attendees?id=${id}&sheetId=${sheetId}`, {
      method: "delete",
      headers: { "Content-Type": "application/json" }
        })
      .then(
        attendees => attendees.json(),
        error => console.log("An error oocurred", error)
      )
      .then(data => {
        console.log(data);
        getSheetById(sheet.sheet_id);
        setLoading(false);

      }).catch((err) =>{
        console.log(err);
        setLoading(false);
      });  
    }



  return (

    <div className="station">
      <CheckinsOptionsModal
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
        setEventId={setEventId}
        events={events}
        setEventName={setEventName}
        setEventDate={setEventDate}
        getOrCreateSheet={getOrCreateSheet}
      />
      <CheckinHeader eventName={eventName} eventDate={moment(eventDate).format('MMMM Do YYYY')} />
      <CheckinContent loading={loading} deleteAttendee={deleteAttendee} attendees={attendees} createAttendee={createAttendee} sheet={sheet} eventName={eventName} eventDate={eventDate} setModalVisibility={setModalVisibility} />
    </div>

  );
}

export default CheckinStation;
