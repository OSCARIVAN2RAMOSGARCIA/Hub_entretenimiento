using System.ComponentModel.DataAnnotations.Schema;
using System;
namespace ContenidoAPI.Models.Entities
{
    public class Favorito
    {
        public int IdUsuario { get; set; }
        public int IdContenido { get; set; }
        public DateTime FechaAgregado { get; set; } = DateTime.Now;
        
        public virtual Usuario Usuario { get; set; }   
        public virtual Contenido Contenido { get; set; }
    }
}