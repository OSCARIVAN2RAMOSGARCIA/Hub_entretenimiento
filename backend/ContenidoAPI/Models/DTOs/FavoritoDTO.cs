// Models/DTOs/FavoritoDTO.cs
namespace ContenidoAPI.Models.DTOs
{
    // DTO representa la información básica de un contenido
    public class FavoritoDTO
    {
        public int IdContenido { get; set; }
        public string NombreContenido { get; set; }
        public string Imagen { get; set; }
        public DateTime FechaAgregado { get; set; }
    }
}