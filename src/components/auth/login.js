import React, { useState } from 'react';

function Login() {

    const [credentials, setCredentials] = useState({
        email : '',
        password : '' 
    })
    const [response, setResponse] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`/api/login`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        })
            .then(response =>  response.json(), error => console.log('An error oocurred', error))
            .then(data =>  setResponse(data.response) );
    }
    return (
        <div>
            Login
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email: </label>
                <input
                    id="email"
                    type="email"
                    value={credentials.email}
                    onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                />

                <label htmlFor="name">Password: </label>
                <input
                    id="password"
                    type="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password : e.target.value})}
                />
                <button type="submit">Submit</button>
            </form>
            {response}
        </div>
    );
}

export default Login