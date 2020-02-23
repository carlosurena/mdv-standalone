import React, { useState } from 'react';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (event) => {
        const credentials = {'username' : username, 'password' : password};
        event.preventDefault();
        fetch(`/api/auth/check`, {
            method: 'post',
            body: credentials,
        })
            .then(response => response.json())
            .then(data => setStatus(data.status));
    }
    return (
        <div>
            Login
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label htmlFor="name">Password: </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
            {status}
        </div>
    );
}

export default Login