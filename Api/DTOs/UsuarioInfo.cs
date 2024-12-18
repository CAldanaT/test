using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Api.DTOs
{
    public class UsuarioInfo
    {
        public Guid? Id { get; set; }
        [Required(ErrorMessage = "El nombre es obligatorio.")]
        [StringLength(250, ErrorMessage = "El nombre no puede exceder los 250 caracteres.")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "El email es obligatorio.")]
        [EmailAddress(ErrorMessage = "El email no es válido.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "El teléfono es obligatorio.")]
        [Phone(ErrorMessage = "El número de teléfono no es válido.")]
        public string Telefono { get; set; }

        [Required(ErrorMessage = "La fecha es obligatoria.")]
        [DataType(DataType.Date, ErrorMessage = "La fecha no es válida.")]
        [FechaValidador]
        public DateTime Fecha { get; set; }

        [Required(ErrorMessage = "La ciudad es obligatorio.")]
        [StringLength(250, ErrorMessage = "La ciudad no puede exceder los 250 caracteres.")]
        public string Ciudad { get; set; }

        [Required(ErrorMessage = "El estado es obligatorio.")]
        [StringLength(250, ErrorMessage = "El estado no puede exceder los 250 caracteres.")]
        public string Estado { get; set; }

        [Required(ErrorMessage = "El pais es obligatorio.")]
        [StringLength(250, ErrorMessage = "El pais no puede exceder los 250 caracteres.")]
        public string Pais { get; set; }
    }
}
