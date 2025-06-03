// Controllers/FavoritosController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ContenidoAPI.Models.DTOs;
using System;
using System.Threading.Tasks;
using ContenidoAPI.Services;
using System.Security.Claims;

namespace ContenidoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritoController : ControllerBase
    {
        private readonly IFavoritoService _favoritoService;

        public FavoritoController(IFavoritoService favoritoService)
        {
            _favoritoService = favoritoService;
        }

        [HttpPost]
        public async Task<ActionResult<FavoritoDTO>> AgregarFavorito([FromBody] FavoritoDTO favoritoDTO)
        {
            try
            {
                var resultado = await _favoritoService.AgregarFavorito(favoritoDTO);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{idUsuario}/{idContenido}")]
        public async Task<IActionResult> EliminarFavorito(int idUsuario, int idContenido)
        {
            var resultado = await _favoritoService.EliminarFavorito(idUsuario, idContenido);
            return resultado ? NoContent() : NotFound();
        }

        [HttpGet("usuario/{idUsuario}")]
        public async Task<ActionResult<List<FavoritoConContenidoDTO>>> ObtenerFavoritos(int idUsuario)
        {
            var favoritos = await _favoritoService.ObtenerFavoritosConContenido(idUsuario);
            return Ok(favoritos);
        }
    }
}
