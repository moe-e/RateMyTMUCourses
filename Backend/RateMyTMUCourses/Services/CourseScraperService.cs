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
        private readonly ChromeDriver _driver;

        public CourseScraperService(CourseService courseService)
        {
            _courseService = courseService;
            _driver = new ChromeDriver();
        }

        public void addCourses()
        {
            ICollection<Course> courses = new HashSet<Course>();
            scrapeDepartments(courses);

            foreach(var course in courses)
            {
                //_courseService.InsertCourse(course);
            }

        }

        private void scrapeDepartments(ICollection<Course> courses)
        {
            string departmentsUrl = "https://www.torontomu.ca/calendar/2023-2024/courses/";

            var driver = new ChromeDriver();
            driver.Url = departmentsUrl;

            var departments = driver.FindElements(By.ClassName("sorting_1"));

            foreach (var department in departments)
            {
                IJavaScriptExecutor jsExecutor = (IJavaScriptExecutor)driver;
                var firstChild = jsExecutor.ExecuteScript("return arguments[0].firstChild;", department);
                IWebElement firstChildElement = (IWebElement)firstChild;

                string departmentLink = firstChildElement.GetAttribute("href");
                scrapeDepartmentCourses(departmentLink, courses);
            }

            driver.Quit();

        }

        private void scrapeDepartmentCourses(string departmentlink, ICollection<Course> courses)
        {
            var driver = new ChromeDriver();
            driver.Url = departmentlink;

            var departmentCourses = driver.FindElements(By.ClassName("courseCode"));

            foreach (var course in departmentCourses)
            {
                string courseLink = course.GetAttribute("href");
                scrapeCourse(courseLink, courses);
            }

        }

        private void scrapeCourse(string courseLink, ICollection<Course> courses)
        {
            _driver.Url = courseLink;

            // Logic to parse course number and name
            var courseHeaderInfo = _driver.FindElement(By.ClassName("resCalendarCourseEmbed"));
            IJavaScriptExecutor jsExecutor = (IJavaScriptExecutor)_driver;
            var courseNumberChild = jsExecutor.ExecuteScript("return arguments[0].children[0];", courseHeaderInfo);
            var courseNameChild = jsExecutor.ExecuteScript("return arguments[0].children[1];", courseHeaderInfo);
            IWebElement courseNumberChildElement = (IWebElement)courseNumberChild;
            IWebElement courseNameChildElement = (IWebElement)courseNameChild;

            var courseNumber = courseNumberChildElement.GetAttribute("innerText");
            var courseDepartment = courseNumber.Split(" ")[0];
            var courseName = courseNameChildElement.GetAttribute("innerText");

            var courseDescription = _driver.FindElement(By.ClassName("courseDescription")).Text;

            // Logic to parse the pre and anti requisites
            var courseRequisitesClass = _driver.FindElements(By.ClassName("requisites"));
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
