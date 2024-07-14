namespace RateMyCoursesTMU.Models
{
    public class Review
    {
        public int ReviewId { get; set; }
        public string CourseName { get; set; }
        public string CourseNumber { get; set; }
        public float Quality { get; set; }
        public float Difficulty { get; set; }
        public string Description { get; set; }
        public string FinalGrade { get; set; }
        public string DatePosted { get; set; }


        public Review(int ReviewId, string CourseName, string CourseNumber, float Quality, float Difficulty, string Description, string FinalGrade, string DatePosted)
        {
            this.ReviewId = ReviewId;
            this.CourseName = CourseName;
            this.CourseNumber = CourseNumber;
            this.Quality = Quality;
            this.Difficulty = Difficulty;
            this.Description = Description;
            this.FinalGrade = FinalGrade;
            this.DatePosted = DatePosted;
        }
    }
}
