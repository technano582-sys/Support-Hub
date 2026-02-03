using Microsoft.AspNetCore.Mvc;

namespace ServiceCore.Controllers
{
    public class KanbanController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
