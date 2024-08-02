import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Link } from 'react-router-dom';
import './Home.css'

//  <a className="exploreLink" href="#">or explore all courses →</a>

function Body (){
    return (
        <div className="container">
            <h1 className="title">Explore thousands of course reviews from TMU students.</h1>

            <div className = 'searchBox'>
                <FontAwesomeIcon className="searchIcon" icon={faSearch} />
                <input type="text" placeholder="Search for courses or subjects"></input>
            </div>

            <button class="learn-more">
                <span class="circle" aria-hidden="true">
                    <span class="icon arrow"></span>
                </span>

                <Link to="/explore">
                    <span class="button-text">or explore all courses</span>
                </Link>
                
            </button>
           
        </div>
    )
}
export default Body