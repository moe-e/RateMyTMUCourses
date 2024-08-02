import './Explore.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faRemove} from '@fortawesome/free-solid-svg-icons';
import CoursePreview from '../CoursePreview/CoursePreview';

function Explore (){
    return (
        <div className='explore'>
            <div className= 'header'>
                <h1 className='title'>Explore all courses</h1>
                <h1 className='description'>Checkout course reviews for all TMU courses.</h1>
            </div>


            <div className='searchingContainer'>
                <div className='courseSearch'>
                    <div className='sortOption'>    
                            <h1>Course Subject</h1>   
                            <div className='selector'>       
                                <select className='sortBox'>
                                    <option value="">Select...</option>
                                </select>

                                <button>
                                    <FontAwesomeIcon className="removeIcon" icon={faRemove} />
                                </button>

                            </div> 
                    </div>
                    <div className = 'searchBox'>
                        <FontAwesomeIcon className="searchIcon" icon={faSearch} />
                        <input type="text" placeholder="Search by course code or title"></input>
                    </div> 
                    
                </div>
            </div>

            <CoursePreview></CoursePreview>
            <CoursePreview></CoursePreview>
            <CoursePreview></CoursePreview>
            <CoursePreview></CoursePreview>
            <CoursePreview></CoursePreview>
            <CoursePreview></CoursePreview>
            <CoursePreview></CoursePreview>
            <CoursePreview></CoursePreview>
            <CoursePreview></CoursePreview>
            <CoursePreview></CoursePreview>
            <CoursePreview></CoursePreview>
            <CoursePreview></CoursePreview>



        </div>
    )
}

export default Explore