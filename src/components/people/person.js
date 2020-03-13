import React, { useState, useEffect } from "react";
import { Row } from "antd";
import ContainerPanel from "../common/containerPanel";
import PersonHeaderPanel from "./personHeaderPanel";
import InfoPanel from "./infoPanel";
import { useHistory, useParams } from "react-router-dom";

function Person() {
  const { id } = useParams();
  const [personData, setPersonData] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisibility, setModalVisibility] = useState(false);
  let history = useHistory();

  useEffect(() => {
    fetchPerson();
  }, []);

  useEffect(() => {
    fetchPerson();
  }, [id]);

  async function fetchPerson() {
    console.log("get req, modal close");
    setModalVisibility(false);

    const res = await fetch("/api/people/" + id);
    res
      .json()
      .then(res => {
        setLoading(false);
        setPersonData(res);
      })
      .catch(err => {
        setLoading(false);
      });
  }
  const deletePerson = async id => {
    setLoading(true);
    console.log("deleting");
    fetch("/api/people/" + id, {
      method: "delete",
      headers: { "Content-Type": "application/json" }
    })
      .then(
        response => response.json(),
        error => console.log("An error oocurred", error)
      )
      .then(data => {
        setResponse(data.response);
        setLoading(false);
        history.push("/people");
      });
  };

  const updatePerson = id => {
    setLoading(true);
    console.log("update req");
    fetch("/api/people/" + id, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(personData)
    })
      .then(
        response => response.json(),
        error => console.log("An error oocurred", error)
      )
      .then(data => {
        setResponse(data.response);
        console.log("update complete ", response);
        setLoading(false);
        setModalVisibility(false);
        console.log("modal close");
      });
  };

  return (
    <Row className="personPage container-padding" gutter={[16, 16]}>
      {personData && !loading ? (
        <>
          <ContainerPanel size={3}>
            <PersonHeaderPanel personData={personData} />
          </ContainerPanel>

          <ContainerPanel noPadding background=" " size={2}>
            <InfoPanel
              personData={personData}
              modalVisibility={modalVisibility}
              setModalVisibility={setModalVisibility}
              refetchData={fetchPerson}
              deletePerson={deletePerson}
              updatePerson={updatePerson}
            />
          </ContainerPanel>

          <ContainerPanel size={1} title="Recent Activity">
            Coming soon...
          </ContainerPanel>
        </>
      ) : (
        "loading..."
      )}
    </Row>
  );
}

export default Person;
