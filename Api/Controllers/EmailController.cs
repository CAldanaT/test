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
    [Route("api/email")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly EmailService _emailService;

        public EmailController(EmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("send")]
        public async Task<HttpStatusCode> SendEmail(UsuarioInfo usuario)
        {
            await _emailService.SendEmailAsync(usuario);

            return HttpStatusCode.OK;
        }
    }
}
