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

        public void UpdateCourse(int courseId, Course updatedCourse)
        {
            var currentCourse = _context.Courses.Find(courseId);

            if (currentCourse != null)
            {
                currentCourse = updatedCourse;
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

        public Course getCourse(string courseId)
        {
            var course = _context.Courses.Find(courseId);
            return course;
        }

        public ICollection<Course> GetCourses()
        {
            var courses = _context.Courses.ToList();
            return courses;
        }
    }
}
