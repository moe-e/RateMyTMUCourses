using RateMyTMUCourses.Data;
using RateMyTMUCourses.Models;
using static System.Net.WebRequestMethods;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium;

namespace RateMyTMUCourses.Services
{
    public class CourseScraperService
    {
        private readonly CourseService _courseService;
        private readonly ChromeDriver _departmentsDriver;
        private readonly ChromeDriver _departmentCoursesDriver;
        private readonly ChromeDriver _coursesDriver;

        public CourseScraperService(CourseService courseService)
        {
            _courseService = courseService;
            _departmentsDriver = new ChromeDriver();
            _departmentCoursesDriver = new ChromeDriver();
            _coursesDriver = new ChromeDriver();
        }

        public void addCourses()
        {
            ICollection<Course> courses = new HashSet<Course>();
            scrapeDepartments(courses);

            _departmentsDriver.Close();
            _departmentCoursesDriver.Close();
            _coursesDriver.Close();

            foreach (var course in courses)
            {
                _courseService.InsertCourse(course);
            }

        }

        private void scrapeDepartments(ICollection<Course> courses)
        {
            string departmentsUrl = "https://www.torontomu.ca/calendar/2023-2024/courses/";

            _departmentsDriver.Url = departmentsUrl;

            var departments = _departmentsDriver.FindElements(By.ClassName("sorting_1"));

            foreach (var department in departments)
            {
                IJavaScriptExecutor jsExecutor = (IJavaScriptExecutor)_departmentsDriver;
                var firstChild = jsExecutor.ExecuteScript("return arguments[0].firstChild;", department);
                IWebElement firstChildElement = (IWebElement)firstChild;

                string departmentLink = firstChildElement.GetAttribute("href");
                scrapeDepartmentCourses(departmentLink, courses);
            }

        }

        private void scrapeDepartmentCourses(string departmentlink, ICollection<Course> courses)
        {
            _departmentCoursesDriver.Url = departmentlink;

            var departmentCourses = _departmentCoursesDriver.FindElements(By.ClassName("courseCode"));

            foreach (var course in departmentCourses)
            {
                string courseLink = course.GetAttribute("href");
                scrapeCourse(courseLink, courses);
            }

        }

        private void scrapeCourse(string courseLink, ICollection<Course> courses)
        {
            _coursesDriver.Url = courseLink;

            // Logic to parse course number and name
            var courseHeaderInfo = _coursesDriver.FindElement(By.ClassName("resCalendarCourseEmbed"));
            IJavaScriptExecutor jsExecutor = (IJavaScriptExecutor)_coursesDriver;
            var courseNumberChild = jsExecutor.ExecuteScript("return arguments[0].children[0];", courseHeaderInfo);
            var courseNameChild = jsExecutor.ExecuteScript("return arguments[0].children[1];", courseHeaderInfo);
            IWebElement courseNumberChildElement = (IWebElement)courseNumberChild;
            IWebElement courseNameChildElement = (IWebElement)courseNameChild;

            var courseNumber = courseNumberChildElement.GetAttribute("innerText");
            var courseDepartment = courseNumber.Split(" ")[0];
            var courseName = courseNameChildElement.GetAttribute("innerText");

            var courseDescription = _coursesDriver.FindElement(By.ClassName("courseDescription")).Text;

            // Logic to parse the pre and anti requisites
            var courseRequisitesClass = _coursesDriver.FindElements(By.ClassName("requisites"));
            var preRequisitesChild = jsExecutor.ExecuteScript("return arguments[0].children[1];", courseRequisitesClass[0]);
            var antiRequisitesChild = jsExecutor.ExecuteScript("return arguments[0].children[1];", courseRequisitesClass[2]);
            IWebElement preRequisitesChildElement = (IWebElement)preRequisitesChild;
            IWebElement antiRequisitesChildElement = (IWebElement)antiRequisitesChild;

            var coursePrerequisites = preRequisitesChildElement.GetAttribute("innerText");
            var courseAntirequisites = antiRequisitesChildElement.GetAttribute("innerText");

            Course newCourse = new Course(courseNumber, courseDepartment, courseName, courseDescription, coursePrerequisites, courseAntirequisites);
            courses.Add(newCourse);
        }

    }
}
