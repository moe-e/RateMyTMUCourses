import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Link } from 'react-router-dom';
import { useState, useEffect, useRef  } from 'react';
import './Home.css'

const BASE_URL = 'https://localhost:7152/api'

function Body (){
    const [courses, setCourses] = useState()
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() =>{
        const filteredSearch = async () =>{
            if (!searchTerm || searchTerm.trim() === '') {
                setCourses()
                setShowDropdown(false);
            }

            else{
                const response = await fetch(`${BASE_URL}/Course/search?query=${searchTerm}`);
                const courses = await response.json();
                setCourses(courses.slice(0,4));
                setShowDropdown(true);
            }
        };

        filteredSearch();

    }, [searchTerm])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showDropdown && !event.target.closest('.dropdown') && !event.target.closest('.learn-more')) {
                setSearchTerm('')
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);


    return (
        <div className="container">
            <h1 className="title">Explore thousands of course reviews from TMU students.</h1>

            <div className = 'searchBox'>
                <FontAwesomeIcon className="searchIcon" icon={faSearch} />
                <input type="text" placeholder="Search for courses or subjects" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}>
                </input>
            </div>

            {showDropdown &&
                <div className='dropdown'>
                    {courses.map((course) => (
                        <Link className='searchOption' to={`/Course/${course.courseId}`}>
                                    {course.courseId} - {course.courseName}
                        </Link>                
                    ))}
                </div>
            }


            <button className="learn-more">
                <span className="circle" aria-hidden="true">
                    <span className="icon arrow"></span>
                </span>

                <Link to="/explore">
                    <span className="button-text">or explore all courses</span>
                </Link>
                
            </button>
           
        </div>
    )
}
export default Body