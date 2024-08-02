import './Login.css'
import { NavLink, Link } from 'react-router-dom';

function Login () {
    return (
        
        <div class="login-box">
            <p>Login</p>
            <form>
                <div class="user-box">
                    <input required="" name="" type="text"/>
                    <label>Email</label>
                </div>
                <div class="user-box">
                    <input required="" name="" type="password"/>
                    <label>Password</label>
                </div>
                <a href="#">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Submit
                </a>
            </form>
            <p>Don't have an account?&nbsp;
                <Link to="/signup" className="a2">
                    Sign up!
                </Link>
            </p>
        
        </div>
    )
}

export default Login