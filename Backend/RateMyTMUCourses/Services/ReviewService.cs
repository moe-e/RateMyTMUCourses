using RateMyTMUCourses.Data;
using RateMyTMUCourses.Models;

namespace RateMyTMUCourses.Services
{
    public class ReviewService
    {
        private readonly AppDbContext _context;
        
        public ReviewService(AppDbContext context) 
        { 
            _context = context; 
        }

        public void AddReivew(Review review)
        {
            _context.Reviews.Add(review);
            _context.SaveChanges();
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
            var review = _context.Courses.Find(reviewId);

            if (review != null)
            {
                _context.Courses.Remove(review);
                _context.SaveChanges();
            }

        }

        public ICollection<Review> GetReviewsForCourse(string courseId)
        {
            var reviews= _context.Reviews.Where(review => review.ReviewCourseId == courseId).ToList();
            return reviews;
        }

        public ICollection<Review> GetAllReviews()
        {
            var courses = _context.Reviews.ToList();
            return courses;
        }

    }
}
