using System;
using Microsoft.EntityFrameworkCore;
using RateMyTMUCourses.Data;
using RateMyTMUCourses.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Add DbContext configuration
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddTransient<CourseService>();
builder.Services.AddTransient<CourseScraperService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

//using (var scope = app.Services.CreateScope())
//{
//    var scraperService = scope.ServiceProvider.GetRequiredService<CourseScraperService>();
//    scraperService.addCourses(); // Assuming this method is synchronous
//}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
