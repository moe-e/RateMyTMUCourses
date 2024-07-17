using RateMyTMUCourses.Data;
using RateMyTMUCourses.Models;

namespace RateMyTMUCourses.Services
{
    public class CourseScraperService
    {
        private readonly CourseService _courseService;

        public CourseScraperService(CourseService courseService)
        {
            _courseService = courseService;

            var courses = getCoursesFromWeb();

            foreach (var course in courses)
            {
                _courseService.InsertCourse(course);
            }

        }

        private ICollection<Course> getCoursesFromWeb()
        {
            ICollection<Course> courses = new HashSet<Course>();


            return courses;

        }

        private void scrapeDepartment(ICollection<Course> courses)
        {

            scrapeDepartmentCourses(courses);
        }

        private void scrapeDepartmentCourses(ICollection<Course> courses)
        {

        }

    }
}
