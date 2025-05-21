using System.ComponentModel.DataAnnotations.Schema;

namespace ContenidoAPI.Models.Entities
{
    // Clase entidad que representa un contenido en la base de datos
    public class Favorito
    {
        [ForeignKey("Usuario")]
        public int IdUsuario { get; set; }
        public Usuario Usuario { get; set; }
        
        [ForeignKey("Contenido")]
        public int IdContenido { get; set; }
        public Contenido Contenido { get; set; }
        
        public DateTime FechaAgregado { get; set; } = DateTime.Now;
    }
}