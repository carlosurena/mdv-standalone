import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';

function Demographics() {
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [response, setResponse] = useState([]);

  useEffect(() => {
    fetchDemographics();
  }, []);
  async function fetchDemographics() {
    setLoading(true);
    const res = await fetch("/api/assets/demographics/age");
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
            <BarChart
                data={response}
                margin={{
                top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        
        ) : (
        "no demographic data"
      )}
    </div>
  );
}

export default Demographics;
