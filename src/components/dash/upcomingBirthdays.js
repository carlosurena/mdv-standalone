import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import moment from "moment";

function UpcomingBirthdays() {
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [response, setResponse] = useState([]);

  useEffect(() => {
    fetchBirthdays();
  }, []);
  async function fetchBirthdays() {
    setLoading(true);
    const res = await fetch("/api/assets/birthdays");
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

  return (
    <div>
      {loading ? (
        <Spin spinning={loading} delay={500}></Spin>
      ) : response ? (
        response.map(person => {
          return (
            <div key={person.person_id}>
              {person.first_name}, {moment.utc(person.birthdate).format("MMMM Do")}
            </div>
          );
        })
      ) : (
        "no birthdays"
      )}
    </div>
  );
}

export default UpcomingBirthdays;
