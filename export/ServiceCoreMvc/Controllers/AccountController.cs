using Microsoft.AspNetCore.Mvc;

namespace ServiceCore.Controllers
{
    public class AccountController : Controller
    {
        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login(string email, string password)
        {
            // Implementation for login
            return RedirectToAction("Index", "Home");
        }
    }
}
