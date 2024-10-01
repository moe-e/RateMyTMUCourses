using Microsoft.AspNetCore.Mvc;
using RateMyTMUCourses.Models;
using RateMyTMUCourses.Services;

namespace RateMyTMUCourses.Controllers
{

    [ApiController]
    [Route("api/User")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        public UserController(UserService service)
        {
            _userService = service;
        }

        [HttpPost]
        [Route("register")]
        public ActionResult registerUser([FromBody] User user)
        {
            _userService.RegisterUser(user);
            return Ok();
        }

        [HttpPost]
        [Route("login")]
        public ActionResult<string> loginUser([FromBody] User user)
        {
            var currentUser = _userService.AuthenticateUser(user);

            if (currentUser == null)
            {
                return BadRequest("Incorrect email or password. Please try again.");
            }

            string token = _userService.CreateToken(currentUser);
            return Ok(token);
        }


        [HttpGet]
        [Route("courses/{email}")]
        public ActionResult<ICollection<Course>> getFavoriteCourses(string email)
        {
            var courses = _userService.getFavorites(email);
            return Ok(courses);
        }

        [HttpPost]
        [Route("courses/{email}/{courseId}")]
        public ActionResult addFavoriteCourse(string email, string courseId)
        {
            _userService.addFavorite(email, courseId);
            return Ok();
        }

        [HttpDelete]
        [Route("courses/{email}/{courseId}")]
        public ActionResult removeFavoriteCourse(string email, string courseId)
        {
            _userService.removeFavorite(email, courseId);
            return Ok();
        }
    }
}

