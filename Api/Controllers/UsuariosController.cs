using Api.DTOs;
using Api.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/usuarios")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly pruebaContext pruebaContext;

        public UsuariosController(pruebaContext pruebaContext)
        {
            this.pruebaContext = pruebaContext;

        }

        [HttpPost]
        [Route("PostUsuario")]
        public async Task<HttpStatusCode> PostUsuario(UsuarioInfo item)
        {
            if (item == null)
                BadRequest("No hay datos para guardar");

            if (ValidateUsusario(item.Email))
                BadRequest("Ya existe un usuarioRegistrado con el correo");

            var newItem = new Usuarios()
            {
                Id = Guid.NewGuid(),
                Nombre = item.Nombre,
                Email = item.Email,
                Telefono = item.Telefono,
                Fecha = item.Fecha,
                Ciudad = item.Ciudad,
                Estado = item.Estado,
                Pais = item.Pais
            };

            pruebaContext.Usuarios.Add(newItem);

            await pruebaContext.SaveChangesAsync();

            return HttpStatusCode.OK;
        }

        private bool ValidateUsusario(string email)
        {
            Usuarios usuario = pruebaContext.Usuarios.FirstOrDefault(u => u.Email == email);

            return usuario != null;
        }

    }
}
