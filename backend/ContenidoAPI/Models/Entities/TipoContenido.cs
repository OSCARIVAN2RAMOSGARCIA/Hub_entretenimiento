// Models/Entities/TipoContenido.cs
namespace ContenidoAPI.Models.Entities
{
    // Clase entidad que representa un contenido en la base de datos
    public class TipoContenido
    {
        public int IdTipo { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public ICollection<Contenido> Contenidos { get; set; }
    }
}




