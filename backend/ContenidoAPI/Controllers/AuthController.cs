using Microsoft.AspNetCore.Mvc;
using ContenidoAPI.Models.DTOs;
using ContenidoAPI.Services;

namespace ContenidoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("registro")]
        public async Task<IActionResult> Registro([FromBody] RegistroDTO registroDTO)
        {
            if (await _authService.ExisteUsuario(registroDTO.Email))
            {
                return BadRequest("El usuario ya existe");
            }

            var usuario = await _authService.Registro(registroDTO);
            return Ok(new { usuario.IdUsuario, usuario.Nombre, usuario.Email });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            var resultadoLogin = await _authService.Login(loginDTO);

            if (resultadoLogin == null || string.IsNullOrEmpty(resultadoLogin.Token))
            {
                return Unauthorized("Credenciales incorrectas");
            }

            return Ok(resultadoLogin);
        }
    }
}