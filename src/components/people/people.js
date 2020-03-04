import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
function People() {
    const dispatch = useDispatch();
    const peopleData = useSelector((state) => state.people.data);
    
    const [response, setResponse] = useState('');
    const [statusMsg, setStatusMsg] = useState('retrieving..');

    useEffect(() => {
        async function fetchData(){
            const res = await fetch("/api/people");
            res.json()
            .then(res => {
                setStatusMsg("done!");
                setResponse(res);
            })
            .catch( err => {
                setStatusMsg("There was an error retrieving the data. Please try again.");
            })
        }

        fetchData();
    }, [])


    return (
        <div>
            <h1>
                People List/Table
            </h1>
            <div>
                {statusMsg}
            </div>
            <ul>
                {response && response.map((person) => {
                    return (
                        <li key={person.person_id}>{person.first_name + " " + person.last_name}</li>
                    )
                })}
            </ul>
        </div>
    );
}

export default People