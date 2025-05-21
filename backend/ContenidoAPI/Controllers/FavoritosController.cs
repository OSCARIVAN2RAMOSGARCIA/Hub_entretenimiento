// Controllers/FavoritosController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ContenidoAPI.Models.DTOs;
using ContenidoAPI.Services;
using System.Security.Claims;

namespace ContenidoAPI.Controllers
{
    // Requiere autenticación para acceder a este controlador
    [Authorize]
    // Define la ruta base como "api/favoritos"
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritosController : ControllerBase
    {
        // Servicio para manejar la lógica de favoritos
        private readonly IFavoritoService _favoritoService;

        // Constructor que inyecta el servicio de favoritos
        public FavoritosController(IFavoritoService favoritoService)
        {
            _favoritoService = favoritoService;
        }

        // Endpoint GET para obtener la lista de favoritos del usuario autenticado
        [HttpGet]
        public async Task<ActionResult<List<FavoritoDTO>>> Get()
        {
            // Obtiene el id del usuario a partir del token (claims)
            var idUsuario = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            
            // Obtiene la lista de favoritos para el usuario
            var favoritos = await _favoritoService.ObtenerFavoritos(idUsuario);
            
            // Retorna la lista con código 200 OK
            return Ok(favoritos);
        }

        // Endpoint POST para agregar un contenido a favoritos, recibe el idContenido como parámetro en la ruta
        [HttpPost("{idContenido}")]
        public async Task<IActionResult> Post(int idContenido)
        {
            // Obtiene el id del usuario autenticado
            var idUsuario = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            
            // Intenta agregar el contenido a favoritos
            var resultado = await _favoritoService.AgregarFavorito(idUsuario, idContenido);

            // Si no se pudo agregar (ya estaba en favoritos), retorna error 400
            if (!resultado)
            {
                return BadRequest("El contenido ya está en favoritos");
            }

            // Si se agregó correctamente, retorna 200 OK sin contenido adicional
            return Ok();
        }

        // Endpoint DELETE para eliminar un contenido de favoritos, recibe el idContenido como parámetro en la ruta
        [HttpDelete("{idContenido}")]
        public async Task<IActionResult> Delete(int idContenido)
        {
            // Obtiene el id del usuario autenticado
            var idUsuario = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            
            // Intenta eliminar el contenido de favoritos
            var resultado = await _favoritoService.EliminarFavorito(idUsuario, idContenido);

            // Si no se encontró el favorito, retorna 404 Not Found
            if (!resultado)
            {
                return NotFound("El favorito no existe");
            }

            // Si se eliminó correctamente, retorna 200 OK
            return Ok();
        }
    }
}
