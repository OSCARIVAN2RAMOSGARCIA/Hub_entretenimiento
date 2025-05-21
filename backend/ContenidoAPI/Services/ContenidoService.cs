// Importamos los modelos necesarios (DTOs, entidades y contexto de base de datos)
using ContenidoAPI.Models.DTOs;
using ContenidoAPI.Models;
using ContenidoAPI.Models.Entities;
using Microsoft.EntityFrameworkCore; // Para usar métodos async de Entity Framework

namespace ContenidoAPI.Services
{
    // Interfaz que define qué métodos debe tener el servicio de contenido
    public interface IContenidoService
    {
        // Método que devuelve una lista de contenido en formato DTO
        Task<List<ContenidoDTO>> ObtenerTodoContenido();
    }

    // Implementación del servicio de contenido
    public class ContenidoService : IContenidoService
    {
        // Variable privada para acceder a la base de datos
        private readonly AppDbContext _context;

        // Constructor que recibe el contexto por inyección de dependencias
        public ContenidoService(AppDbContext context)
        {
            _context = context;
        }

        // Método que obtiene todos los contenidos de la base de datos y los convierte en DTOs
        public async Task<List<ContenidoDTO>> ObtenerTodoContenido()
        {
            return await _context.Contenidos
                .Include(c => c.Tipo) // Incluye la relación con la tabla Tipo (JOIN)
                .Select(c => new ContenidoDTO // Convertimos la entidad Contenido a ContenidoDTO
                {
                    IdContenido = c.IdContenido,
                    Nombre = c.Nombre,
                    Genero = c.Genero,
                    Duracion = c.Duracion,
                    Calificacion = c.Calificacion,
                    Imagen = c.Imagen,
                    TipoContenido = c.Tipo.Nombre // Obtenemos el nombre del tipo (por ejemplo: "película", "serie")
                })
                .ToListAsync(); // Ejecutamos la consulta y devolvemos la lista
        }
    }
}
