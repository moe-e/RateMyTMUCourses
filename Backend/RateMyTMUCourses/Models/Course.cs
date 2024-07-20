namespace RateMyTMUCourses.Models
{
    public class Course
    {
        public string CourseId { get; set; }
        public string CourseDepartment { get; set; }
        public string CourseName { get; set; }
        public string CourseDescription { get; set; }
        public string CoursePrerequisites { get; set; }
        public string CourseAntirequisites { get; set; }
        public float CourseRating { get; set; }
        public float CourseDifficulty { get; set; }
        public int NumberOfReviews { get; set; }
        public ICollection<Review>? Reviews { get; set; }

        public Course(string CourseId, string CourseDepartment, string CourseName,  string CourseDescription, string CoursePrerequisites, string CourseAntirequisites)
        {
            this.CourseId = CourseId;
            this.CourseDepartment = CourseDepartment;
            this.CourseName = CourseName;
            this.CourseDescription = CourseDescription;
            this.CoursePrerequisites = CoursePrerequisites;
            this.CourseAntirequisites = CourseAntirequisites;
        }
    }
}
