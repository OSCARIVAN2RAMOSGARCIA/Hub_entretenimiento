// Importamos los modelos, DTOs y Entity Framework Core para trabajar con la base de datos
using ContenidoAPI.Models.DTOs;
using ContenidoAPI.Models;
using ContenidoAPI.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace ContenidoAPI.Services
{
    // Interfaz que define los métodos que debe tener el servicio de favoritos
    public interface IFavoritoService
    {
        Task<List<FavoritoDTO>> ObtenerFavoritos(int idUsuario);  // Obtener favoritos de un usuario
        Task<bool> AgregarFavorito(int idUsuario, int idContenido); // Agregar un contenido a favoritos
        Task<bool> EliminarFavorito(int idUsuario, int idContenido); // Eliminar un favorito
    }

    // Implementación del servicio que maneja los favoritos
    public class FavoritoService : IFavoritoService
    {
        // Contexto para acceder a la base de datos
        private readonly AppDbContext _context;

        // Constructor que recibe el contexto por inyección de dependencias
        public FavoritoService(AppDbContext context)
        {
            _context = context;
        }

        // Método para agregar un contenido a los favoritos de un usuario
        public async Task<bool> AgregarFavorito(int idUsuario, int idContenido)
        {
            // Verifica si el favorito ya existe para evitar duplicados
            var existeFavorito = await _context.Favoritos
                .AnyAsync(f => f.IdUsuario == idUsuario && f.IdContenido == idContenido);

            if (existeFavorito) return false; // Si ya existe, no lo agrega y devuelve false

            // Crea un nuevo objeto Favorito con los datos recibidos y fecha actual
            var favorito = new Favorito
            {
                IdUsuario = idUsuario,
                IdContenido = idContenido,
                FechaAgregado = DateTime.Now
            };

            // Agrega el favorito a la base de datos
            _context.Favoritos.Add(favorito);
            await _context.SaveChangesAsync(); // Guarda los cambios de forma asíncrona

            return true; // Devuelve true si se agregó correctamente
        }

        // Método para eliminar un favorito dado el usuario y el contenido
        public async Task<bool> EliminarFavorito(int idUsuario, int idContenido)
        {
            // Busca el favorito que coincida con el usuario y contenido
            var favorito = await _context.Favoritos
                .FirstOrDefaultAsync(f => f.IdUsuario == idUsuario && f.IdContenido == idContenido);

            if (favorito == null) return false; // Si no existe, devuelve false

            // Elimina el favorito encontrado
            _context.Favoritos.Remove(favorito);
            await _context.SaveChangesAsync(); // Guarda los cambios

            return true; // Devuelve true si se eliminó correctamente
        }

        // Método para obtener la lista de favoritos de un usuario
        public async Task<List<FavoritoDTO>> ObtenerFavoritos(int idUsuario)
        {
            return await _context.Favoritos
                .Where(f => f.IdUsuario == idUsuario) // Filtra solo los favoritos del usuario
                .Include(f => f.Contenido) // Incluye la información del contenido relacionado
                .Select(f => new FavoritoDTO // Convierte la entidad Favorito a FavoritoDTO para enviar solo los datos necesarios
                {
                    IdContenido = f.IdContenido,
                    NombreContenido = f.Contenido.Nombre,
                    Imagen = f.Contenido.Imagen,
                    FechaAgregado = f.FechaAgregado
                })
                .ToListAsync(); // Ejecuta la consulta y devuelve la lista
        }
    }
}
