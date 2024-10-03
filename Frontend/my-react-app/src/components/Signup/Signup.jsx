import './Signup.css';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const BASE_URL = 'https://www.mytmucourses-env.eba-b2fnzzy2.ca-central-1.elasticbeanstalk.com/api/User/register'; // Updated to sign-up endpoint

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Optional: Confirm Password
    const [error, setError] = useState('');

    const navigate = useNavigate(); // To programmatically navigate after sign-up

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page

        // Reset error message
        setError('');

        // Basic validation
        if (!email || !password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const body = { "Email": email, "Password": password };
            
            const response = await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                window.location.assign('/login'); //refreshes the page
            } else {
                // Handle server-side validation errors
                const errorData = await response.json();
                setError(errorData.message || 'Sign up failed. Please try again.');
            }
        } catch (err) {
            // Handle network or unexpected errors
            setError('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <div className="signup-box">
            <p>Sign Up</p>
            <form onSubmit={handleSubmit}>
                <div className="user-box">
                    <input
                        required
                        type="email"
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
                <div className="user-box">
                    <input
                        required
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <label>Confirm Password</label>
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="submit-button">
                    Sign Up
                </button>
            </form>
            <p>
                Already have an account?&nbsp;
                <Link to="/login" className="a2">
                    Login!
                </Link>
            </p>
        </div>
    );
}

export default Signup;
