using Microsoft.EntityFrameworkCore;
using RateMyCoursesTMU.Models;

namespace RateMyCoursesTMU.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Review> Reviews { get; set; }
    }
}
