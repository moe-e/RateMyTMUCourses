import './Navbar.css'
import { NavLink, Link } from 'react-router-dom';
import moonPicture from '../../assets/moonPic.webp'
import homePicture from '../../assets/tmu.png'
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa'; // Importing user profile icon
import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';



function Navbar (){

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuDisplayed, setIsMenuDisplayed] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);


      // Effect for authentication status
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }    
    }, []);

    // Effect for responsive menu
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 600) {
                setIsMenuDisplayed(true); // Initially closed on small screens
            } else {
                setIsMenuDisplayed(false); // Open on larger screens
            }
        };

        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);
        
    }, []);
    

    return (
        <div>

        <div className='header'>

        <Link to="/" className='homeButton'>
            <img className='image' src={homePicture} alt="Home"/>
        </Link>

        {!isMenuDisplayed ? (

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

            <div className='rightSide'>
                {isLoggedIn ? (
                    <Link to="/profile">
                        <FaUserCircle className='profile-icon' size={33} />
                    </Link>
                ) : (
                    <Link to="/login">
                        <button className='login'>Log in &#8680;</button>
                    </Link>
                )}
            </div>

        </div>) :
        (
             <div class="hamburger-menu">
                <div class="menu-bar" onClick={() => setIsMenuOpen(true)}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div> )
        }  
         </div>        

        {isMenuOpen && (
            <div className='tabs'>

                <button className="close-button" onClick={ () => setIsMenuOpen(false)}>
                    <MdClose className='closeIcon' size={40}></MdClose>
                </button>

                <div className='tabOptions'>
                    <NavLink to="/" className={'option'} onClick={ () => setIsMenuOpen(false)}>
                        <h1>Home</h1>
                    </NavLink >

                    <NavLink to="/explore" className={'option'} onClick={ () => setIsMenuOpen(false)}>
                        <h1>Explore</h1>
                    </NavLink >

                    <NavLink to="/about" className={'option'} onClick={ () => setIsMenuOpen(false)}>
                        <h1>About</h1>
                    </NavLink >

                    {isLoggedIn ? (
                        <NavLink  to="/login"className={'option'} onClick={ () => setIsMenuOpen(false)}>
                            <h1>Profile</h1>
                        </NavLink>
                    ) : (
                        <NavLink  to="/login"className={'option'} onClick={ () => setIsMenuOpen(false)}>
                            <h1>Log in</h1>
                        </NavLink>
                    )}

                </div>

            </div>) 
        }


    </div>
    );
}

export default Navbar