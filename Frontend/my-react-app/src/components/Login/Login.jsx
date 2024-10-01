import './Login.css';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const BASE_URL = 'https://localhost:7152/api/User/login'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page

        // Reset error message
        setError('');

        // Basic validation (optional, since inputs are required)
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        try {
            // Send POST request to your authentication endpoint
           
            const body = {"Email": email, "Password": password}
            const response = await fetch(BASE_URL, {
                method: 'POST',  
                headers: {
                    'Content-Type': 'application/json'  
                },
                body: JSON.stringify(body)
            });

            if (response.ok)
            {
                const token = await response.text();

                if (token) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('email', email);
                    window.location.assign('/'); //refreshes the page
                } else {
                    setError('Invalid response from server.');
                }
            }

            else{
                setError('Incorrect email or password. Please try again.');
            }
            
        } catch (err) {
            // Handle errors (e.g., invalid credentials, server errors)
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Incorrect email or password. Please try again.');
            }
        }
    };

    return (
        <div className="login-box">
            <p>Login</p>
            <form onSubmit={handleSubmit}>
                <div className="user-box">
                    <input
                        required
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Email</label>
                </div>
                <div className="user-box">
                    <input
                        required
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>Password</label>
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="submit-button">
                    LOGIN
                </button>
            </form>
            <p>
                Don't have an account?&nbsp;
                <Link to="/signup" className="a2">
                    Sign up!
                </Link>
            </p>
        </div>
    );
}

export default Login;
