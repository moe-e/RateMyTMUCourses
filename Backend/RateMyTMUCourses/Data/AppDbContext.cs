using Microsoft.EntityFrameworkCore;
using RateMyTMUCourses.Models;

namespace RateMyTMUCourses.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Review> Reviews { get; set; }
    }
}
