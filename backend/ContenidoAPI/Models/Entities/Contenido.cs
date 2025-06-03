// Models/Entities/Contenido.cs
using System.ComponentModel.DataAnnotations.Schema; // Para ColumnAttribute
namespace ContenidoAPI.Models.Entities
{
    // Clase entidad que representa un contenido en la base de datos
    public class Contenido
    {
        public int IdContenido { get; set; }
        public string Nombre { get; set; }
        public string Genero { get; set; }
        public string Duracion { get; set; }
        [Column(TypeName = "decimal(3,1)")] // Especifica precisión 3 dígitos total, 1 decimal
        public decimal Calificacion { get; set; }
        public string Imagen { get; set; }
        public int IdTipo { get; set; }
        public TipoContenido Tipo { get; set; }
        
        public ICollection<Favorito> Favoritos { get; set; }
    }
}
