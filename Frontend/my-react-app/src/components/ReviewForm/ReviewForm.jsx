import './ReviewForm.css'
import Rating from '../Rating/Rating'
function ReviewForm(){
    return(
        <div className="formContainer">
            <h1 className='title'> Course Review Form</h1>
            <h1 className='description'>We value your opinion. Please leave a review to help as many students as possible.</h1>

            <div className='questions'>
                <div className='rating'>
                    <h1>Rating (1 - 5)</h1>
                    <Rating currentValue={0} isReadOnly={false} fontSize={23}/>
                </div>
                
                <div className='difficulty'>
                    <h1>Difficulty (1 - 5)</h1>
                    <Rating currentValue={0} isReadOnly={false} fontSize={23}/>
                </div>

                <div className='professorInput'>
                    <h1>Which professor did you have?</h1>
                    <textarea type="text" placeholder="Professor name..."></textarea>
                </div>

                <div className='review'>
                    <h1>Overall Review</h1>
                    <textarea type="text" placeholder="What do you want other students to know about this course?"></textarea>
                </div>

                
               



               

            </div>
            
            <div className='submit'>
                <button>
                    Submit Review
                </button>
            </div>
           
           
        
        </div>
    )
}

export default ReviewForm