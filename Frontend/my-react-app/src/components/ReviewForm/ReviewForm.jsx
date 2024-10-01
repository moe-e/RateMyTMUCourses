import './ReviewForm.css'
import { useState, useEffect } from 'react';
import Rating from '../Rating/Rating'

const BASE_URL = 'https://localhost:7152/api/Review'

function ReviewForm(props){
    const [submitted, setSubmitted] = useState(false);
    const [difficultyRating, setDifficultyRating] = useState(0);
    const [overallRating, setOverallRating] = useState(0);
    const [professorName, setProfessorName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() =>{
        const addReview = async () => {
            if (submitted){
                let newReview =
                    {
                        "courseId": props.courseId,
                        "professorName": professorName,
                        "description": description,
                        "finalGrade": "N/A",
                        "quality": overallRating,
                        "difficulty": difficultyRating,
                        "datePosted": new Date().toJSON()
                    }

                await fetch(BASE_URL, {
                    method: 'POST',  
                    headers: {
                        'Content-Type': 'application/json'  
                    },
                    body: JSON.stringify(newReview) 
                });

            }
        };

        addReview();

    }, [submitted]);


    return(
        <div>
        {!submitted ? (

            <div className="formContainer">
                <h1 className='title'> Course Review Form</h1>
                <h1 className='description'>We value your opinion. Please leave a review to help as many students as possible.</h1>

                <div className='questions'>
                    <div className='rating'>
                        <h1>Rating (1 - 5)</h1>
                        <Rating id="qualityInput" currentValue={0} isReadOnly={false} fontSize={23} onChange={setOverallRating}/>
                    </div>
                    
                    <div className='difficulty'>
                        <h1>Difficulty (1 - 5)</h1>
                        <Rating id="difficultyInput" currentValue={0} isReadOnly={false} fontSize={23} onChange={setDifficultyRating}/>
                    </div>

                    <div className='professorInput'>
                        <h1>Which professor did you have?</h1>
                        <textarea onChange={(e) => setProfessorName(e.target.value)} type="text" placeholder="Professor name..."></textarea>
                    </div>

                    <div className='review'>
                        <h1>Overall Review</h1>
                        <textarea onChange={(e) => setDescription(e.target.value)} type="text" placeholder="What do you want other students to know about this course?"></textarea>
                    </div>


                </div>
                
                <div className='submit'>
                    <button className='submitButton' onClick={() => setSubmitted(true)}>
                        Submit Review
                    </button>
                </div>
           
            </div> ) :
                        <div className="submittedContainer">

                <h1 className='reviewDone'>Thank you for leaving a review!</h1>
                </div>



        } 
        </div>

        )

}

export default ReviewForm