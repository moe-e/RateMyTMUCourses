import Rating from '../Rating/Rating.jsx';
import './CourseReview.css'

function CourseReview() {
    return(
        <div className="reviewBox">
            <div className="reviewBoxHeader">
                <h1>04/24/2024</h1>

                <div className='courseRating'>
                    <div className='rating'>
                        <h1>RATING</h1>
                        <Rating currentValue={5} isReadOnly={true} fontSize={19}/>
                    </div>
                    
                    <div className='difficulty'>
                        <h1>DIFFICULTY</h1>
                        <Rating currentValue={2} isReadOnly={true} fontSize={19} />
                    </div>
                </div>
            </div>

            <div className="reviewText">
                this course was garbage. do not take do not do not domf oemrfoe meomr eormeomoefmdomfom
            </div>

            <div className="professor">
                <h1>Professor:</h1>
                <h1 className='name'>Bob Okay</h1>

            </div>
        </div>
    )
}

export default CourseReview;