import './Course.css'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartCircleCheck, faHeart} from '@fortawesome/free-solid-svg-icons';
import Rating from '../Rating/Rating.jsx';
import CourseReview from '../CourseReview/CourseReview.jsx'
import Loader from '../Loader/Loader.jsx';
import ReviewForm from '../ReviewForm/ReviewForm.jsx'

const BASE_URL = 'https://www.mytmucourses-env.eba-b2fnzzy2.ca-central-1.elasticbeanstalk.com/api/Course/'
const SAVEDCOURSES_URL = 'https://www.mytmucourses-env.eba-b2fnzzy2.ca-central-1.elasticbeanstalk.com/api/User/courses/'

function Course () {
    const params = useParams();
    const courseId = params.number;

    const [course, setCourse] = useState();
    const [loading, setLoading] = useState(true);
    const [saveButton, setSaveButton] = useState(false)
    const email = localStorage.getItem('email');

    useEffect(() =>{
        const fetchCourse = async () => {
            const response = await fetch(BASE_URL + courseId);
            const course = await response.json();
            setCourse(course);

            if (email){
                const response = await fetch(SAVEDCOURSES_URL + email);
                const courses = await response.json();

                if (courses.some(c => c.courseId === courseId)) {
                    setSaveButton(true);
                }
            }

            setLoading(false);
        };
        
        fetchCourse();

    }, [])
    
    const manageCourse = async () => {
        const token = localStorage.getItem('token');

        if (!saveButton){
            if (token) {

                await fetch(SAVEDCOURSES_URL + email + '/' + courseId, {
                    method: 'POST',  
                    headers: {
                        'Content-Type': 'application/json'  
                    }
                });
                
                setSaveButton(true)
            }
            else{
                alert("You need to be logged in to perform this action.")
            }
        }

        else{
            await fetch(SAVEDCOURSES_URL + email + '/' + courseId, {
                method: 'DELETE',  
                headers: {
                    'Content-Type': 'application/json'  
                }
            });

            setSaveButton(false)
        }

    }
    
    if (loading){
        return <Loader></Loader>
    }

    return (
    
        <div className='courseComponent'>
            <div className='courseBox'>
                <div className='courseInfo'>
                    <div className='courseMain'>
                        <h1 className='courseNumber'>{course.courseId}</h1>
                        {!saveButton ? (
                            <button className='favouriteButtonOff' onClick={() => manageCourse()}>   
                                <FontAwesomeIcon className='heart' icon={faHeart}></FontAwesomeIcon>
                                Save
                            </button>
                        ): 
                            (<button className='favouriteButtonOn' onClick={() => manageCourse()}>   
                                <FontAwesomeIcon className='heart' icon={faHeart}></FontAwesomeIcon>
                                Unsave
                            </button>
                            )
                        }
                    </div>
                    <h1 className='courseTitle'>{course.courseName}</h1>
                    <h1 className='courseDescription'>{course.courseDescription}</h1>
                    <h1 className='reviewCount'>{course.numberOfReviews} review(s)</h1>
                </div>

                <div className='courseRating'>
                    <div className='rating'>
                        <h1>RATING</h1>
                        <Rating currentValue={course.courseRating} isReadOnly={true} />
                    </div>
                    
                    <div className='difficulty'>
                        <h1>DIFFICULTY</h1>
                        <Rating currentValue={course.courseDifficulty} isReadOnly={true} />
                    </div>
                </div>

            </div>

            <div className='reviewComponent'>
                <div className='reviewsContainer'>
                    <CourseReview courseId={course.courseId}/>
                </div>

                <div className='reviewBox'>
                    <ReviewForm courseId={course.courseId}/>
                </div>

            </div>
            
        </div>
    )
}

export default Course