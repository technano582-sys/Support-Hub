using Microsoft.AspNetCore.Mvc;

namespace ServiceCore.Controllers
{
    public class UsersController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
