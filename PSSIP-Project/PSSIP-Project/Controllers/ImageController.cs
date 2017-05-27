using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using PSSIP_Project.Models;


namespace PSSIP_Project.Controllers
{
    public class ImageController: Controller
    {
        private readonly Random _random = new Random(DateTime.Now.Millisecond);
        private static int MaxStar = 5;



        public ActionResult AddImage(HttpPostedFileBase file)
        {
            var fileName = file.FileName;
            var path = GetPathToImg(fileName);
            file.SaveAs(path);
            return RedirectToAction("Index","Home");
        }

        public ActionResult RemoveImg(string url)
        {
            var path = Server.MapPath(url);
            System.IO.File.Delete(path);

            return Json(true);

        }

        public JsonResult AddImgAjax(string fileName, string data)
        {
            var firsIndex = data.IndexOf('/')+1;
            var secondIndex = data.IndexOf(';')-firsIndex;
            var imageExtension =data.Substring(firsIndex,secondIndex) ;
            
            
            var dataIndex = data.IndexOf("base64", StringComparison.Ordinal) + 7;
            var clearData = data.Substring(dataIndex);
            var fileData = Convert.FromBase64String(clearData);
            var bytes = fileData.ToArray();

            fileName = fileName + '.' + imageExtension;

            var path = GetPathToImg(fileName);

            using (var fileStream = System.IO.File.Create(path))
            {
                fileStream.Write(bytes,0,bytes.Length);
                fileStream.Close();
            }

            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetImage()
        {
            var serverPath = Server.MapPath("~");
            var pathToImageFolder = Path.Combine(serverPath, "image");
            var imageFile = Directory.GetFiles(pathToImageFolder);
            var imges = imageFile.Select(BuildImage);
            return Json(imges, JsonRequestBehavior.AllowGet);
        }

        private string GetPathToImg(string fileName)
        {
            var serverPath = Server.MapPath("~");

            return Path.Combine(serverPath, "image", fileName);
        }

        private Image BuildImage(string path)
        {
            var fileName = Path.GetFileName(path);
            var image = new Image
            {
                Url = Url.Content("~/image/" + fileName),
                Name = Path.GetFileNameWithoutExtension(path),
                Description = Path.GetExtension(path),                                          
                Star = _random.Next(3,MaxStar)
            };
            return image;
        }

    }
}