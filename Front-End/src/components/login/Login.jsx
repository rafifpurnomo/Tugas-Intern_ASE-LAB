import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); 

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                return;
            }

            localStorage.setItem('token', data.token);
            
            if (data.user.role === 'admin') {
                window.location.href = '/AHome'; // Adjust the path as needed
            } else {
                window.location.href = '/home'; // Adjust the path as needed
            }
        } catch (err) {
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
}

export default Login;
