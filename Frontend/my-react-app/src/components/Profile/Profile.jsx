import './Profile.css';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CoursePreview from '../CoursePreview/CoursePreview.jsx';
import { FaUserCircle, FaHeart } from 'react-icons/fa'; // Importing user profile icon

const BASE_URL = 'https://mytmucourses.onrender.com/api/User/courses/'


function Profile() {
    const [favouritedCourses, setFavouritedCourses] = useState([]);
    const email = localStorage.getItem('email');
    
    useEffect(() =>{
        const fetchFavouritedCourses = async () => {
            const response = await fetch(BASE_URL + email);
            const courses = await response.json();
            setFavouritedCourses(courses);
        };

        fetchFavouritedCourses();

    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem('email');
        window.location.assign('/');
    };

    return (
        <div className="profile-container">
            <FaUserCircle className='profileIcon' size={90} />
            <p>{email}</p>
            <button onClick={handleLogout} className="logout-button">Logout</button>
            <div className='courses'>
                <div className='sectionHeader'>
                    <FaHeart size={23}/>
                    <h3>Favorited Courses</h3>

                </div>
                {favouritedCourses.length > 0 ? (

                favouritedCourses.map(course => {
                return(<CoursePreview 
                    key={course.courseId} 
                    number={course.courseId} 
                    title={course.courseName} 
                    description={course.courseDescription}>
                </CoursePreview>)})

                ) : (
                    <p>No favorited courses found.</p>
                )}
            </div>
        </div>
    );
}

export default Profile;
