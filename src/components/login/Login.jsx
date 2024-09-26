import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
    
        try {
            const payload = { username, password };
            const response = await fetch('http://localhost:4000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }
    
            localStorage.setItem('token', data.token);
            onLogin(data.user.nama, data.user.role, data.user.nim, data.user.jurusan, data.user.angkatan, data.user.id); // Pass user's name and role to the parent component
            navigate('/'); // Redirect to home or another page
        } catch (err) {
            setError(err.message);
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