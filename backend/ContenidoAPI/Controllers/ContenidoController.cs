// Controllers/ContenidoController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ContenidoAPI.Models.DTOs;
using ContenidoAPI.Services;

namespace ContenidoAPI.Controllers
{
    // Define la ruta base para este controlador como "api/contenido"
    [Route("api/[controller]")]
    [ApiController]
    public class ContenidoController : ControllerBase
    {
        // Servicio para manejar la lógica relacionada con el contenido
        private readonly IContenidoService _contenidoService;

        // Constructor que recibe la implementación del servicio de contenido
        public ContenidoController(IContenidoService contenidoService)
        {
            _contenidoService = contenidoService;
        }

        // Endpoint GET para obtener toda la lista de contenidos: /api/contenido
        [HttpGet]
        public async Task<ActionResult<List<ContenidoDTO>>> Get()
        {
            // Llama al servicio para obtener todos los contenidos
            var contenidos = await _contenidoService.ObtenerTodoContenido();

            // Retorna el resultado con código 200 OK y la lista de contenidos
            return Ok(contenidos);
        }
    }
}
