using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PSSIP_Project.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
       /* public JsonResult GetAllImages()
        {
            var test = new List<string>();
            return Json(test, JsonRequestBehavior.AllowGet);
        }
        */
    }
}