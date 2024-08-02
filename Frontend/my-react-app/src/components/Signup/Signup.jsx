import '../Login/Login.css'
import { NavLink, Link } from 'react-router-dom';

function Signup () {
    return (
        
        <div class="login-box">
            <p>Signup</p>
            <form>
                <div class="user-box">
                    <input required="" name="" type="text"/>
                    <label>Email</label>
                </div>
                <div class="user-box">
                    <input required="" name="" type="password"/>
                    <label>Password</label>
                </div>
                <div class="user-box">
                    <input required="" name="" type="password"/>
                    <label>Confirm Password</label>
                </div>
                <a href="#">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Submit
                </a>
            </form>
            <p>Already have an account?&nbsp;
                <Link to="/login" className="a2">
                    Sign in!
                </Link>
            </p>
        </div>
    )
}

export default Signup