using RateMyTMUCourses.Data;
using RateMyTMUCourses.Models;

namespace RateMyTMUCourses.Services
{
    public class CourseService
    {
        private readonly AppDbContext _context;

        public CourseService(AppDbContext context)
        {
            _context = context;
        }

        public void InsertCourse(Course course)
        {
            _context.Courses.Add(course);
            _context.SaveChanges();
        }

        public void UpdateCourse(int courseId)
        {
            var course = _context.Courses.Find(courseId);

            if (course != null)
            {
                course.CourseName = "new";
                _context.SaveChanges();
            }

        }

        public void DeleteCourse(int courseId)
        {
            var course = _context.Courses.Find(courseId);

            if (course != null)
            {
                _context.Courses.Remove(course);
                _context.SaveChanges();
            }

        }

        public List<Course> GetCourses()
        {
            var courses = _context.Courses.ToList();
            return courses;
        }
    }
}
