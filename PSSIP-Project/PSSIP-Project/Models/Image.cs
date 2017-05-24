using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PSSIP_Project.Models
{

    // TODO сменить папку для картинок 
    public class Image
    {
        public string Url { get; set; }
        public string Name { get; set; }
        // TODO поменять
        public string Description { get; set; }
        public int Star { get; set; }
    }
}