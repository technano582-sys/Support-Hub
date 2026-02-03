using Microsoft.AspNetCore.Mvc;

namespace ServiceCore.Controllers
{
    public class ProjectsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
