using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Api.DTOs;
using System;

public class EmailService
{
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendEmailAsync(UsuarioInfo usuario)
    {
        var emailSubject = "Registro exitoso";
        var emailBody = $"Estimado {usuario.Nombre},\nHemos recibido tus datos y nos pondremos en contacto con usted a la brevedad posible. Enviaremos un correo con información a su cuenta: {usuario.Email}";

        var htmlContent = $@"
        <html>
        <body>
        <style>
            <p>Estimado {usuario.Nombre},</p>
            <p>Hemos recibido sus datos y nos pondremos en contacto con usted en la brevedad posible. Enviaremos un correo con información a su cuenta: <b>{usuario.Email}</b>.</p>
            <br><br>
            <p>Atte.<br><b>Green Leaves</b><br>{usuario.Ciudad}, {usuario.Estado}, {usuario.pais} a {usuario.Fecha}</p>
        </body>
        </html>";

        var client = new SendGridClient(_configuration["EmailSettings:SendGridApiKey"]);
        var from = new EmailAddress(_configuration["EmailSettings:SenderEmail"]);
        var to = new EmailAddress(usuario.Email);
        var msg = MailHelper.CreateSingleEmail(from, to, emailSubject, emailBody, htmlContent);
        var response = await client.SendEmailAsync(msg);

        if (response.StatusCode != System.Net.HttpStatusCode.OK)
        {
            // Manejar el error si ocurre
            throw new Exception($"Error al enviar el correo: {response.StatusCode}");
        }
    }
}