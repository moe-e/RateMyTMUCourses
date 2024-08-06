import './CoursePreview.css'
import { NavLink, Link } from 'react-router-dom';

function CoursePreview (props){
    return (
        <Link to={`/course/${props.number}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="coursePreview">
                <h1 className="courseTitle">{props.number} - {props.title}</h1>
                <h1 className="courseDescription">{props.description}</h1>
            </div>
        </Link>
    )
}

export default CoursePreview