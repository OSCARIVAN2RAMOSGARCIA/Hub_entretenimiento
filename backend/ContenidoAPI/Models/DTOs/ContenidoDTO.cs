// Models/DTOs/ContenidoDTO.cs
namespace ContenidoAPI.Models.DTOs
{
    // DTO representa la información básica de un contenido
    public class ContenidoDTO
    {
        public int IdContenido { get; set; }
        public string Nombre { get; set; }
        public string Genero { get; set; }
        public string Duracion { get; set; }
        public decimal Calificacion { get; set; }
        public string Imagen { get; set; }
        public string TipoContenido { get; set; }
    }
}