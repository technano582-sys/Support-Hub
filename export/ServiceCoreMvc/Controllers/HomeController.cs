using Microsoft.AspNetCore.Mvc;
using ServiceCore.Models;

namespace ServiceCore.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
