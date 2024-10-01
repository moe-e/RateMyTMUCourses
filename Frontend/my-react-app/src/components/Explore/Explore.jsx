import './Explore.css'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faRemove} from '@fortawesome/free-solid-svg-icons';
import CoursePreview from '../CoursePreview/CoursePreview.jsx';
import Loader from '../Loader/Loader.jsx'

const BASE_URL = 'https://localhost:7152/api'

function Explore (){
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() =>{
        const fetchCourses = async () =>{
            const response = await fetch(`${BASE_URL}/Course`);
            const courses = await response.json();
            setCourses(courses);
            setLoading(false);
        };

        fetchCourses();

    }, [])

    useEffect(() =>{
        const filteredSearch = async () =>{
            if (!searchTerm || searchTerm.trim() === '') {
                fetchCourses();
            }

            else{
                const response = await fetch(`${BASE_URL}/Course/search?query=${searchTerm}`);
                const courses = await response.json();
                setCourses(courses);
            }
         
        };

        filteredSearch();

    }, [searchTerm])


    if (loading) {
        return <Loader></Loader>
    }

    return (
        <div className='explore'>
            <div className= 'header'>
                <h1 className='title'>Explore all courses</h1>
                <h1 className='description'>Checkout course reviews for all TMU courses.</h1>
            </div>


            <div className='searchingContainer'>
                <div className='courseSearch'>
                    {/*<div className='sortOption'>    
                            <h1>Course Subject</h1>   
                            <div className='selector'>       
                                <select className='sortBox'>
                                    <option value="">Select...</option>
                                </select>

                                <button>
                                    <FontAwesomeIcon className="removeIcon" icon={faRemove} />
                                </button>

                            </div> 
                    </div>*/}
                    <div className = 'searchBox'>
                        <FontAwesomeIcon className="searchIcon" icon={faSearch} />
                        <input type="text" placeholder="Search by course code or title" value={searchTerm}
                             onChange={(e) => setSearchTerm(e.target.value)}>
                        </input>
                        
                    </div> 
                    
                </div>
            </div>


            {courses.map(course => {
                return (<CoursePreview key={course.courseId} number={course.courseId} title={course.courseName} description={course.courseDescription}></CoursePreview>);
            })}          

        </div>
    )
}

export default Explore