using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ContenidoAPI.Models.Entities
{
    // Clase entidad que representa un contenido en la base de datos
    public class Usuario
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdUsuario { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Nombre { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Email { get; set; }
        
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        
        public DateTime FechaRegistro { get; set; } = DateTime.Now;
        
        public ICollection<Favorito> Favoritos { get; set; }
    }
}