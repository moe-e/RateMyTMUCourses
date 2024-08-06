import './Course.css'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartCircleCheck, faHeart} from '@fortawesome/free-solid-svg-icons';
import Rating from '../Rating/Rating.jsx';
import CourseReview from '../CourseReview/CourseReview.jsx'
import Loader from '../Loader/Loader.jsx';
import ReviewForm from '../ReviewForm/ReviewForm.jsx'

const BASE_URL = 'https://localhost:7152/api/Course/'

function Course () {
    const params = useParams();
    const courseId = params.number;

    const [course, setCourse] = useState();
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState(null);



    useEffect(() =>{
        const fetchCourse = async () => {
            const response = await fetch(BASE_URL + courseId);
            const course = await response.json();
            setCourse(course);
            setLoading(false);
        };

        fetchCourse();

    }, [])

    if (loading){
        return <Loader></Loader>
    }

    return (
    
        <div className='courseComponent'>
            <div className='courseBox'>
                <div className='courseInfo'>
                    <div className='courseMain'>
                        <h1 className='courseNumber'>{course.courseId}</h1>
                        <button className='favouriteButtonOff'>   
                            <FontAwesomeIcon className='heart' icon={faHeart}></FontAwesomeIcon>
                            Unsave
                        </button>
                    </div>
                    <h1 className='courseTitle'>{course.courseName}</h1>
                    <h1 className='courseDescription'>{course.courseDescription}</h1>
                    <h1 className='reviewCount'>{course.numberOfReviews} review(s)</h1>
                </div>

                <div className='courseRating'>
                    <div className='rating'>
                        <h1>RATING</h1>
                        <Rating currentValue={5} isReadOnly={true} />
                    </div>
                    
                    <div className='difficulty'>
                        <h1>DIFFICULTY</h1>
                        <Rating currentValue={2} isReadOnly={true} />
                    </div>
                </div>

            </div>

            <div className='reviewComponent'>
                <div className='reviewsContainer'>
                    <CourseReview/>
                    <CourseReview/>
                    <CourseReview/>
                    <CourseReview/>

                </div>

                <div className='reviewBox'>
                    <ReviewForm/>
                </div>

            </div>
            

            
    
        </div>
    )
}

export default Course