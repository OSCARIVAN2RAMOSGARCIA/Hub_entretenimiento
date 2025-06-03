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
        Task<FavoritoDTO> AgregarFavorito(FavoritoDTO favoritoDTO);
        Task<bool> EliminarFavorito(int idUsuario, int idContenido);
        Task<List<FavoritoConContenidoDTO>> ObtenerFavoritosConContenido(int idUsuario);
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
        public async Task<FavoritoDTO> AgregarFavorito(FavoritoDTO favoritoDTO)
        {
            if (await _context.Favoritos.AnyAsync(f => 
                f.IdUsuario == favoritoDTO.IdUsuario && 
                f.IdContenido == favoritoDTO.IdContenido))
            {
                throw new Exception("Este contenido ya está en favoritos");
            }

            var favorito = new Favorito
            {
                IdUsuario = favoritoDTO.IdUsuario,
                IdContenido = favoritoDTO.IdContenido
            };

            _context.Favoritos.Add(favorito);
            await _context.SaveChangesAsync();

            return favoritoDTO;
        }

        // Método para eliminar un favorito dado el usuario y el contenido
        public async Task<bool> EliminarFavorito(int idUsuario, int idContenido)
        {
            var favorito = await _context.Favoritos
                .FirstOrDefaultAsync(f => 
                    f.IdUsuario == idUsuario && 
                    f.IdContenido == idContenido);

            if (favorito == null) return false;

            _context.Favoritos.Remove(favorito);
            await _context.SaveChangesAsync();
            return true;
        }


        // Método para obtener la lista de favoritos de un usuario
        public async Task<List<FavoritoConContenidoDTO>> ObtenerFavoritosConContenido(int idUsuario)
        {
            return await _context.Favoritos
                .Where(f => f.IdUsuario == idUsuario)
                .Include(f => f.Contenido)
                .ThenInclude(c => c.Tipo)
                .Select(f => new FavoritoConContenidoDTO
                {
                    IdUsuario = f.IdUsuario,
                    IdContenido = f.IdContenido,
                    FechaAgregado = f.FechaAgregado,
                    NombreContenido = f.Contenido.Nombre,
                    Genero = f.Contenido.Genero,
                    Duracion = f.Contenido.Duracion,
                    Calificacion = f.Contenido.Calificacion,
                    Imagen = f.Contenido.Imagen,
                    TipoContenido = f.Contenido.Tipo.Nombre
                })
                .ToListAsync();
        }
    }
}
