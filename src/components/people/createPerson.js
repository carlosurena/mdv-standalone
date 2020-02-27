import React, { useState } from 'react';

function CreatePerson() {

    const [personData, setPersonData] = useState({
        first_name: null,
        middle_name: null,
        last_name: null,
        gender: null,
        birthdate: null,
        email: null,
        address: null,
        city: null,
        state: null,
        phone: null,
        member_type: null,
        allergies: null,
        grade: null,
        nickname: null
    });

    const [response, setResponse] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(personData)
        fetch(`/api/people`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(personData),
        })
            .then(response =>  response.json(), error => console.log('An error oocurred', error))
            .then(data =>  setResponse(data.response) );
    }
    return (
        <div>
            Create person
            <form onSubmit={handleSubmit}>
                <label htmlFor="first_name">First: </label>
                <input
                    id="first_name"
                    type="text"
                    value={personData.first_name}
                    onChange={(e) => setPersonData({ ...personData, first_name: e.target.value })}
                />

                <label htmlFor="last_name">Last: </label>
                <input
                    id="last_name"
                    type="text"
                    value={personData.last_name}
                    onChange={(e) => setPersonData({ ...personData, last_name: e.target.value })}
                />
                <label htmlFor="gender">Gender: </label>
                <input
                    id="gender"
                    type="text"
                    value={personData.gender}
                    onChange={(e) => setPersonData({ ...personData, gender: e.target.value })}
                />

                <button type="submit">Submit</button>


            </form>
            {response}
        </div>
    );
}

export default CreatePerson