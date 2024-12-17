using Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UbicacionesController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly string _geonamesApiUrl;
        private readonly string _geonamesUsername;

        public UbicacionesController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClient = httpClientFactory.CreateClient();

            _geonamesApiUrl = configuration["GeonamesApi:Url"];
            _geonamesUsername = configuration["GeonamesApi:Username"];
        }

        [HttpGet("buscar")]
        public async Task<IActionResult> BuscarUbicaciones([FromQuery] string termino)
        {
            if (string.IsNullOrWhiteSpace(termino) || termino.Length < 3)
            {
                return BadRequest("Debe ingresar al menos 3 caracteres.");
            }

            var url = $"{_geonamesApiUrl}?q={termino}&maxRows=10&username={_geonamesUsername}";
            var response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, "Error al obtener datos de Geonames API.");
            }

            var contenido = await response.Content.ReadAsStringAsync();
            var resultado = JsonConvert.DeserializeObject<List<Ciudad>>(contenido);

            var ciudades = resultado.Select(c => new
            {
                NombreLargo = c.Name + ", " + c.AdminName1 + ", " + c.CountryName,
                Nombre = c.Name,
                Estado = c.AdminName1,
                Pais = c.CountryName
            }).ToList();

            return Ok(ciudades);
        }
    }
}
