import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); 

        // Log the payload you're sending to the server
        console.log('Payload:', JSON.stringify({ username, password }));

        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }), // Send the username and password in the request body
            });

            // Log the full response status and body for debugging
            console.log('Response Status:', response.status);

            const data = await response.json();
            console.log('Response Data:', data);

            // Check if the request was successful
            if (!response.ok) {
                setError(data.message || 'Something went wrong. Please try again.');
                return;
            }

            // Store the token in localStorage
            localStorage.setItem('token', data.token);

            // Redirect based on the user's role
            if (data.user.role === 'admin') {
                window.location.href = '/AHome'; 
            } else {
                window.location.href = '/home'; 
            }
        } catch (err) {
            // Log the error in case of a network failure or other issue
            console.error('Error:', err);
            setError('Server error. Please try again later.');
        }
    };

    return (
        <>
            <header className='header2'>
                <div className='header-content'>
                    <img src={`Ellipse.png`} alt="Header Logo" className='header-logo' />
                </div>
            </header>
            <div className='wrapper-container'>
                <div className='wrapper'>
                    <div className='left'>
                        <img src={`telkom2.png`} alt="Logo" className='logo' />
                        <p className='welcome-text'>
                            Website ini menyediakan pelayanan untuk segala kendala terhadap KTM, mulai dari perbaikan, penggantian, dan kendala lainnya.
                        </p>
                    </div>
                    <div className='right'>
                        <h1>SSO Login</h1>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <form onSubmit={handleLogin}>
                            <div className='input-box'>
                                <input
                                    type="text"
                                    placeholder='Username'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='input-box'>
                                <input
                                    type="password"
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
