using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
    public class GeonamesResponse
    {
        public List<Ciudad> Geonames { get; set; }
    }

    public class Ciudad
    {
        public string NombreLargo { get; set; }
        public string Name { get; set; }
        public string AdminName1 { get; set; }
        public string CountryName { get; set; }
    }
}
