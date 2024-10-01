using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;  


namespace RateMyTMUCourses.Models
{
    public class User
    {
        [Key]
        public string Email { get; set; }
        public string Password { get; set; }
        public List<Course> FavoriteCourses { get; set; }


        public User(string Email, string Password)
        {
            this.Email = Email;
            this.Password = Password;
            this.FavoriteCourses = new List<Course>();
        }

    }
}
