import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';
  
function Attendance() {
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [response, setResponse] = useState([]);

  useEffect(() => {
    fetchAttendance();
  }, []);
  async function fetchAttendance() {
    setLoading(true);
    const res = await fetch("/api/assets/attendance");
    res
      .json()
      .then(res => {
        setStatusMsg("done!");
        setLoading(false);
        setResponse(res);
        console.log(res)
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
          <ResponsiveContainer width="95%" height={400}>
            <LineChart
                data={response}
                margin={{
                top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sheet_date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        
        ) : (
        "no demographic data"
      )}
    </div>
  );
}

export default Attendance;
