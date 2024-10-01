using RateMyTMUCourses.Data;
using RateMyTMUCourses.Models;
using BCrypt.Net;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.EntityFrameworkCore;
using RateMyTMUCourses.Migrations;

namespace RateMyTMUCourses.Services
{
    public class UserService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public UserService(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public void RegisterUser(User user)
        {
            var password = user.Password;
            user.Password = HashPassword(password);

            var users = _context.Users.ToList();

            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public User GetUser(string email)
        {
            var users = _context.Users.ToList();
            var foundUser = users.FirstOrDefault(u => u.Email.Equals(email, StringComparison.OrdinalIgnoreCase));

            return foundUser;
        }

        public User AuthenticateUser(User inputUser)
        {
            if (inputUser == null)
                throw new ArgumentNullException(nameof(inputUser));

            var userEmail = inputUser.Email;

            var users = _context.Users.ToList();

            var foundUser = users.FirstOrDefault(u => u.Email.Equals(userEmail, StringComparison.OrdinalIgnoreCase));

            if (foundUser != null)
            {
                if (BCrypt.Net.BCrypt.Verify(inputUser.Password, foundUser.Password))
                {
                    return foundUser;
                }
            }
            return null;


        }

        // JWT CREATION...
        public string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.
                GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims:claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: cred);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        public string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public ICollection<Course> getFavorites(string email)
        {
            var user =  _context.Users
            .Include(u => u.FavoriteCourses)  // Load FavoriteCourses
            .FirstOrDefault(u => u.Email == email);

            if (user == null)
            {
                return new List<Course>();
            }

            return user.FavoriteCourses;
        }

        public void addFavorite(string email, string courseId)
        {
            var user = _context.Users
            .Include(u => u.FavoriteCourses)  // Load FavoriteCourses
            .FirstOrDefault(u => u.Email == email);

            if (user != null && !user.FavoriteCourses.Any(c => c.CourseId.ToLower().Replace(" ", "") == courseId.ToLower().Replace(" ", "")))
            {
                var course = _context.Courses.FirstOrDefault(c => c.CourseId.ToLower().Replace(" ", "") == courseId.ToLower().Replace(" ", ""));

                if (course != null)
                {
                    user.FavoriteCourses.Add(course);
                    _context.SaveChanges();
                }         
            }
        }

        public void removeFavorite(string email, string courseId)
        {
            var user = _context.Users
            .Include(u => u.FavoriteCourses)  // Load FavoriteCourses
            .FirstOrDefault(u => u.Email == email);

            if (user != null && user.FavoriteCourses.Any(c => c.CourseId.ToLower().Replace(" ", "") == courseId.ToLower().Replace(" ", "")))
            {
                var course = _context.Courses.FirstOrDefault(c => c.CourseId.ToLower().Replace(" ", "") == courseId.ToLower().Replace(" ", ""));

                if (course != null)
                {
                    user.FavoriteCourses.Remove(course);
                    _context.SaveChanges();
                }
            }
        }

    }
}