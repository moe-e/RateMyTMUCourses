using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        [HttpGet]
        public ActionResult<ICollection<Course>> GetCourses()
        {
            var courses = _courseService.GetCourses().ToList();
            return Ok(courses);
        }

        [HttpGet]
        [Route("test")]
        public ActionResult GetCourse2()
        {
            return Ok("working");
        }

        [HttpGet]
        [Route("{courseId}")]
        public ActionResult<ICollection<Course>> GetCourse(string courseId)
        {
            var course = _courseService.GetCourse(courseId);
            return Ok(course);
        }

        [HttpPost]
        public ActionResult InsertCourse([FromBody] Course course)
        {
            _courseService.InsertCourse(course);
            return Ok();
        }

        [HttpPut]
        [Route("{courseId}")]
        public ActionResult UpdateCourse(string courseId, [FromBody] Course newCourse)
        {
            _courseService.UpdateCourse(courseId, newCourse);
            return Ok();
        }

        [HttpDelete]
        [Route("{courseId}")]
        public ActionResult DeleteCourse(string courseId) 
        {
            _courseService.DeleteCourse(courseId);
            return Ok();
        }

        [HttpGet]
        [Route("search")]
        public IActionResult Search([FromQuery] string query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return Ok();
            }

            string queryLower = query.ToLower();

            var courses = _courseService.GetCourses().ToList()
                .Where(c =>
                    c.CourseId.Replace(" ", "").ToLower().Contains(queryLower.Replace(" ", "")) ||
                    c.CourseName.ToLower().Contains(queryLower)).ToList();

            return Ok(courses);
        }

    }
}
