import './Navbar.css'
import { NavLink, Link } from 'react-router-dom';
import moonPicture from '../../assets/moonPic.webp'
import homePicture from '../../assets/tmu.png'

function Navbar (){
    return (
    <div className='header'>

        <Link to="/" className='homeButton'>
            <img className='image' src={homePicture} alt="Home"/>
        </Link>

        <div className="tab-options">
            <NavLink  to="/" className={({ isActive }) => isActive ? 'option active' : 'option'}>
                <h1>Home</h1>
            </NavLink >

            <NavLink  to="/explore" className={({ isActive }) => isActive ? 'option active' : 'option'}>
                <h1>Explore</h1>
            </NavLink >

            <NavLink  to="/about" className={({ isActive }) => isActive ? 'option active' : 'option'}>
                <h1>About</h1>
            </NavLink >
        </div>

        <div className='rightSide'>
            <Link to="/login">
                <button className='login'>Log in &#8680;</button>
            </Link>
        </div>
        
    </div>
    );
}

export default Navbar