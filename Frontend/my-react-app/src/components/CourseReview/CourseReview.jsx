import Rating from '../Rating/Rating.jsx';
import { useState, useEffect } from 'react';
import './CourseReview.css'

const BASE_URL = 'https://mytmucourses.onrender.com/api/Review/'

function CourseReview(props) {
    const courseId = props.courseId;

    const [reviews, setReviews] = useState([]);

    useEffect(() =>{
        const fetchReviews = async () => {
            const response = await fetch(BASE_URL + courseId);
            const reviews = await response.json();
            setReviews(reviews);
        };

        fetchReviews();

    }, [])

    return (
        <div>
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <div className="reviewBox">
                        <div className="reviewBoxHeader">
                            <h1>{review.datePosted.split('T')[0]}</h1>

                            <div className='courseRating'>
                                <div className='rating'>
                                    <h1>RATING</h1>
                                    <Rating currentValue={review.quality} isReadOnly={true} fontSize={19}/>
                                </div>

                                <div className='difficulty'>
                                    <h1>DIFFICULTY</h1>
                                    <Rating currentValue={review.difficulty} isReadOnly={true} fontSize={19} />
                                </div>
                            </div>
                        </div>

                        <div className="reviewText">
                            {review.description}
                        </div>

                        <div className="professor">
                            <h1>Professor:</h1>
                            <h1 className='name'>{review.professorName}</h1>
                        </div>
                    </div>
                ))
            ) : (
                <div className="emptyReviewBox"> No reviews available. Be the first to leave a review!</div>
            )}
        </div>
    );


    
}

export default CourseReview;