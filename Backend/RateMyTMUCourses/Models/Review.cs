namespace RateMyTMUCourses.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int CourseId { get; set; }
        public string ProfessorName { get; set; }
        public string Description { get; set; }
        public string FinalGrade { get; set; }
        public float Quality { get; set; }
        public float Difficulty { get; set; }
        public DateTime DatePosted { get; set; }


        public Review(int Id,  int CourseId, string ProfessorName, string Description, string FinalGrade, float Quality, float Difficulty, DateTime DatePosted)
        {
            this.Id = Id;
            this.CourseId = CourseId;
            this.ProfessorName = ProfessorName;
            this.Quality = Quality;
            this.Difficulty = Difficulty;
            this.Description = Description;
            this.FinalGrade = FinalGrade;
            this.DatePosted = DatePosted;
        }
    }
}
