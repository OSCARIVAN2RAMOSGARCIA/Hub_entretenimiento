// Models/DTOs/RegistroDTO.cs
namespace ContenidoAPI.Models.DTOs
{
    // DTO representa la información básica de un contenido
    public class RegistroDTO
    {
        public string Nombre { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
