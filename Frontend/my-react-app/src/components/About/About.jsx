import './About.css'
function About (){
    return (
        <div className='aboutContainer'>
            <h1 className='pageTitle'>Welcome to MyTMUCourses!</h1>
            <div className='aboutPage'>

                <h1 className='description'>MyTMUCourses is a student made course review website for courses
                    offered at Toronto Metropolitan University. This is a nonprofit platform that aims to provide transparent and accurate information to help students plan out their courses with informed decision-making. We encourage contributions from the TMU community to ensure the resource remains valuable.
                </h1>
                <h1 className='titleHeader'>About us</h1>
                <h1 className='description'>MyTMUCourses is a side project I started with the simple goal of helping TMU students pick courses. Many times
                    students are confused on whether a course is worth taking and they may not be aware of its difficulty. For this reason, I wanted to integrate reviews
                    for each course to help students make a more-informed decision during their course selections.
                </h1>
                <h1 className='titleHeader'>Contact us</h1>
                <h1 className='description'>If you have any questions or concerns, please don't hesitate to reach out to us.</h1>
                <a className='linkedIn' href="https://www.linkedin.com/in/mohamad-e">LinkedIn</a>

            </div>
        </div>
    )
}

export default About