using Microsoft.AspNetCore.Mvc;

namespace ServiceCore.Controllers
{
    public class TicketsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Details(string id)
        {
            return View();
        }
    }
}
