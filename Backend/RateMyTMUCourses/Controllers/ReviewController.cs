using Microsoft.AspNetCore.Mvc;
using RateMyTMUCourses.Services;
using RateMyTMUCourses.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace RateMyTMUCourses.Controllers
{
    [ApiController]
    [Route("api/Review")]
    public class ReviewController : ControllerBase
    {
        private readonly ReviewService _reviewService;

        public ReviewController(ReviewService reviewService)
        {
            _reviewService = reviewService;
        }


        [HttpGet]
        public ActionResult<ICollection<Review>> GetAllReviews()
        {
            var reviews = _reviewService.GetAllReviews();
            return Ok(reviews);
        }

        [HttpGet]
        [Route("{courseId}")]
        public ActionResult<ICollection<Review>> GetReviewsForCourse(string courseId)
        {
            var reviews = _reviewService.GetReviewsForCourse(courseId);
            return Ok(reviews);
        }

        [HttpPost]
        public ActionResult addReview([FromBody] Review review)
        {
            _reviewService.AddReivew(review);
            return Ok();
        }

        [HttpDelete]
        [Route("{reviewId}")]
        public ActionResult DeleteReview(int reviewId)
        {
            _reviewService.DeleteReview(reviewId);
            return Ok();
        }

    }

}
