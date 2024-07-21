﻿using Microsoft.AspNetCore.Http.HttpResults;
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

        [HttpGet]
        public ActionResult<ICollection<Course>> GetCourses()
        {
            var courses = _courseService.GetCourses().ToList();
            return Ok(courses);
        }

        [HttpGet("{courseId}")]
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

        [HttpPut("{courseId}")]
        public ActionResult UpdateCourse(string courseId, [FromBody] Course newCourse)
        {
            _courseService.UpdateCourse(courseId, newCourse);
            return Ok();
        }

        [HttpDelete("{courseId}")]
        public ActionResult DeleteCourse(string courseId) 
        {
            _courseService.DeleteCourse(courseId);
            return Ok();
        }

    }
}
