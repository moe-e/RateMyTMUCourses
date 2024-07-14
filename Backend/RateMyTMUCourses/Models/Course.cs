namespace RateMyTMUCourses.Models
{
    public class Course
    {
        public string CourseName { get; set; }
        public string CourseNumber { get; set; }
        public string CourseDepartment { get; set; }
        public int CourseId { get; set; }

        public Course(string CourseName, string CourseNumber, string CourseDepartment, int CourseId)
        {
            this.CourseName = CourseName;
            this.CourseNumber = CourseNumber;
            this.CourseDepartment = CourseDepartment;
            this.CourseId = CourseId;
        }
    }
}
