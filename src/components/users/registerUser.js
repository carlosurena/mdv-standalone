import React, { useState } from 'react';

function RegisterUser() {

    const [userData, setUserData] = useState({
        email: null,
        username: null,
        password: null,
        auth_status: null,
        oaut_provider: null,
        photourl: null,
        person_id: null,
        active: null,
        last_login_date: null,
        created_by: null,
        updated_by: null
    });

    const [response, setResponse] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(userData)
        fetch(`/api/register`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        })
            .then(response =>  response.json(), error => console.log('An error oocurred', error))
            .then(data =>  setResponse(data.response) );
    }
    return (
        <div>
            Register User
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">username: </label>
                <input
                    id="username"
                    type="text"
                    value={userData.username}
                    onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                />

                <label htmlFor="password">Password: </label>
                <input
                    id="password"
                    type="password"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                />


                

                <button type="submit">Submit</button>


            </form>
            {response}
        </div>
    );
}

export default RegisterUser