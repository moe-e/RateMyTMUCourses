namespace RateMyTMUCourses.Models
{
    public class Course
    {
        public int Id { get; set; }
        public string CourseNumber { get; set; }
        public string CourseDepartment { get; set; }
        public string CourseName { get; set; }
        public string CourseDescription { get; set; }
        public string CoursePrerequisites { get; set; }
        public string CourseAntirequisites { get; set; }
        public float CourseRating { get; set; }
        public float CourseDifficulty { get; set; }
        public int NumberOfReviews { get; set; }
        public ICollection<Review>? Reviews { get; set; }

        public Course(int Id, string CourseNumber, string CourseDepartment, string CourseName,  string CourseDescription, string CoursePrerequisites, string CourseAntirequisites)
        {
            this.Id = Id;
            this.CourseNumber = CourseNumber;
            this.CourseDepartment = CourseDepartment;
            this.CourseName = CourseName;
            this.CourseDescription = CourseDescription;
            this.CoursePrerequisites = CoursePrerequisites;
            this.CourseAntirequisites = CourseAntirequisites;
        }
    }
}
