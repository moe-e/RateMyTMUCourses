using RateMyTMUCourses.Data;
using RateMyTMUCourses.Models;

namespace RateMyTMUCourses.Services
{
    public class ReviewService
    {
        private readonly AppDbContext _context;
        private readonly CourseService _courseService;
        
        public ReviewService(AppDbContext context, CourseService courseService) 
        { 
            _context = context;
            _courseService = courseService;
        }

        public void AddReivew(Review review)
        {
            _context.Reviews.Add(review);
            _context.SaveChanges();

            var course = _courseService.GetCourse(review.CourseId);
            var updatedCourse = updateCourseInfo(course);
        

            _courseService.UpdateCourse(course.CourseId, updatedCourse);
        }

        public void UpdateReview(int reviewId, Review updatedReview)
        {
            var currentReview = _context.Reviews.Find(reviewId);

            if (currentReview != null)
            {
                currentReview = updatedReview;
                _context.SaveChanges();
            }

        }

        public void DeleteReview(int reviewId)
        {
            var review = _context.Reviews.Find(reviewId);

            if (review != null)
            {
                _context.Reviews.Remove(review);
                _context.SaveChanges();

                var course = _courseService.GetCourse(review.CourseId);
                var updatedCourse = updateCourseInfo(course);
            }

        }

        public ICollection<Review> GetReviewsForCourse(string courseId)
        {
            var reviews = _context.Reviews
                .Where(review => review.CourseId == courseId)
                .OrderByDescending(review => review.DatePosted)
                .ToList();

            return reviews;
        }
        
        public ICollection<Review> GetAllReviews()
        {
            var reviews = _context.Reviews
                .OrderByDescending(review => review.DatePosted)
                .ToList();

            return reviews;
        }

        private Course updateCourseInfo(Course course)
        {
            course.NumberOfReviews = _context.Reviews.Count(r => r.CourseId == course.CourseId);
            course.CourseRating = _context.Reviews.Where(r => r.CourseId == course.CourseId).Average(r => r.Quality);
            course.CourseDifficulty = _context.Reviews.Where(r => r.CourseId == course.CourseId).Average(r => r.Difficulty);

            return course;
        }

    }
}
