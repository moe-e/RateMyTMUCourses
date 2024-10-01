using Microsoft.EntityFrameworkCore;
using RateMyTMUCourses.Models;

namespace RateMyTMUCourses.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Create new table to combine users with courses. M to N relationship.

        modelBuilder.Entity<User>()
            .HasMany(u => u.FavoriteCourses)
            .WithMany()
            .UsingEntity<Dictionary<string, object>>(
                "FavoritedCourses",
                j => j.HasOne<Course>().WithMany().HasForeignKey("CourseId"),
                j => j.HasOne<User>().WithMany().HasForeignKey("UserEmail")
        );

        // Configure other entities (Course, Review) as needed
        // EF Core will handle their configurations based on conventions and data annotations
}

}
}
