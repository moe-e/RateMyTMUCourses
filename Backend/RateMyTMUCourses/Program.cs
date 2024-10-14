using System;
using Microsoft.EntityFrameworkCore;
using RateMyTMUCourses.Data;
using RateMyTMUCourses.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

//Let only my frontend call this api
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("http://localhost:5173", "https://rate-my-tmu-courses.vercel.app", "https://www.mytmucourses.ca")
                .AllowAnyHeader()
                .AllowAnyMethod(); ;
        });
});

// Add DbContext configuration
// builder.Services.AddDbContext<AppDbContext>(options =>
// options.UseNpgsql(builder.Configuration.GetConnectionString("Database")));

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(Environment.GetEnvironmentVariable("ConnectionStrings__Database")));

builder.Services.AddTransient<CourseService>();
builder.Services.AddTransient<ReviewService>();
builder.Services.AddTransient<UserService>();

// builder.Services.AddTransient<CourseScraperService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

// To scrape and add courses to DB.
// using (var scope = app.Services.CreateScope())
//{
//    var scraperService = scope.ServiceProvider.GetRequiredService<CourseScraperService>();
//   scraperService.addCourses(); // Assuming this method is synchronous
//}

//app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseCors();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
