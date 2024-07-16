using Microsoft.AspNetCore.Mvc;
using RateMyTMUCourses.Data;
using RateMyTMUCourses.Models;
using RateMyTMUCourses.Services;

namespace RateMyTMUCourses.Controllers
{
    [ApiController]
    [Route("api/Course")]
    public class CourseController : ControllerBase
    {
        private readonly CourseService _courseService;
        
        public CourseController(CourseService service)
        {
            _courseService = service;
        }

        public List<Course> Index()
        {
            return _courseService.GetCourses().ToList();
        }

        public void InsertCourse(Course course)
        {
            _courseService.InsertCourse(course);
        }

        public void UpdateCourse(int courseId, Course newCourse)
        {
            _courseService.UpdateCourse(courseId, newCourse);

        }

        public void DeleteCourse(int courseId) 
        {
            _courseService.DeleteCourse(courseId);

        }

        
    }
}
