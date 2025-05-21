// Se importan los paquetes necesarios para trabajar con Entity Framework Core y las entidades del proyecto
using Microsoft.EntityFrameworkCore;
using ContenidoAPI.Models.Entities;

namespace ContenidoAPI.Models
{
    // Esta clase representa el contexto de la base de datos (es como una puerta para acceder a las tablas)
    public class AppDbContext : DbContext
    {
        // Constructor que recibe opciones de configuración, como la cadena de conexión
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Estas propiedades representan las tablas en la base de datos
        public DbSet<TipoContenido> TiposContenido { get; set; } // Tabla de tipos (película, serie, etc.)
        public DbSet<Contenido> Contenidos { get; set; }         // Tabla principal de contenido multimedia
        public DbSet<Usuario> Usuarios { get; set; }             // Tabla de usuarios
        public DbSet<Favorito> Favoritos { get; set; }           // Tabla que guarda los contenidos favoritos por usuario

        // Este método se ejecuta cuando se crea el modelo. Aquí se configuran las relaciones y restricciones.
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuración para la tabla Usuario
            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(u => u.IdUsuario); // Clave primaria
                entity.Property(u => u.IdUsuario).ValueGeneratedOnAdd(); // Se autogenera
                entity.HasIndex(u => u.Email).IsUnique(); // No se pueden repetir emails
                entity.Property(u => u.Nombre).HasMaxLength(100).IsRequired(); // Campo obligatorio con máximo 100 caracteres
                entity.Property(u => u.Email).HasMaxLength(100).IsRequired();
            });

            // Configuración para la tabla TipoContenido
            modelBuilder.Entity<TipoContenido>(entity =>
            {
                entity.HasKey(t => t.IdTipo); // Clave primaria
                entity.Property(t => t.IdTipo).ValueGeneratedOnAdd();
                entity.Property(t => t.Nombre).HasMaxLength(20).IsRequired();
                entity.Property(t => t.Descripcion).HasMaxLength(100); // Este campo es opcional
            });

            // Configuración para la tabla Contenido
            modelBuilder.Entity<Contenido>(entity =>
            {
                entity.HasKey(c => c.IdContenido);
                entity.Property(c => c.IdContenido).ValueGeneratedOnAdd();
                entity.Property(c => c.Nombre).HasMaxLength(100).IsRequired();
                entity.Property(c => c.Genero).HasMaxLength(100).IsRequired();
                entity.Property(c => c.Duracion).HasMaxLength(50).IsRequired();
                entity.Property(c => c.Imagen).HasMaxLength(255).IsRequired();

                // Relación con TipoContenido: un contenido tiene un tipo
                entity.HasOne(c => c.Tipo)
                    .WithMany(t => t.Contenidos) // Un tipo puede tener varios contenidos
                    .HasForeignKey(c => c.IdTipo) // Clave foránea
                    .OnDelete(DeleteBehavior.Restrict); // Evita que se borren contenidos si se borra un tipo
            });

            // Configuración para la tabla Favorito (relación muchos a muchos)
            modelBuilder.Entity<Favorito>(entity =>
            {
                // Clave compuesta: la combinación de IdUsuario e IdContenido es única
                entity.HasKey(f => new { f.IdUsuario, f.IdContenido });

                // Relación con Usuario
                entity.HasOne(f => f.Usuario)
                    .WithMany(u => u.Favoritos) // Un usuario puede tener varios favoritos
                    .HasForeignKey(f => f.IdUsuario)
                    .OnDelete(DeleteBehavior.Cascade); // Si se borra el usuario, se borran sus favoritos

                // Relación con Contenido
                entity.HasOne(f => f.Contenido)
                    .WithMany(c => c.Favoritos) // Un contenido puede estar en favoritos de varios usuarios
                    .HasForeignKey(f => f.IdContenido)
                    .OnDelete(DeleteBehavior.Cascade); // Si se borra el contenido, se borran los favoritos relacionados

                // Valor por defecto: si no se especifica fecha, se usará la fecha actual
                entity.Property(f => f.FechaAgregado).HasDefaultValueSql("GETDATE()");
            });
        }
    }
}
