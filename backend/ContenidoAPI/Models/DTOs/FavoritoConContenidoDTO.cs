namespace ContenidoAPI.Models.DTOs
{
    public class FavoritoConContenidoDTO
    {
        public int IdUsuario { get; set; }
        public int IdContenido { get; set; }
        public DateTime FechaAgregado { get; set; }
        
        // Datos del contenido
        public string NombreContenido { get; set; }
        public string Genero { get; set; }
        public string Duracion { get; set; }
        public decimal Calificacion { get; set; }
        public string Imagen { get; set; }
        public string TipoContenido { get; set; }
    }
}