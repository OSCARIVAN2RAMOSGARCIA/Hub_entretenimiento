// Controllers/AuthController.cs
using Microsoft.AspNetCore.Mvc;
using ContenidoAPI.Models.DTOs;
using ContenidoAPI.Services;

namespace ContenidoAPI.Controllers
{
    // Define la ruta base para este controlador como "api/auth"
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        // Servicio de autenticación inyectado para manejar lógica de usuario
        private readonly IAuthService _authService;

        // Constructor que recibe la implementación del servicio de autenticación
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        // Endpoint POST para registrar un nuevo usuario: /api/auth/registro
        [HttpPost("registro")]
        public async Task<IActionResult> Registro([FromBody] RegistroDTO registroDTO)
        {
            // Verifica si el usuario ya existe usando el email proporcionado
            if (await _authService.ExisteUsuario(registroDTO.Email))
            {
                // Retorna error 400 si el usuario ya existe
                return BadRequest("El usuario ya existe");
            }

            // Registra el usuario llamando al servicio de autenticación
            var usuario = await _authService.Registro(registroDTO);

            // Retorna un OK con los datos básicos del usuario registrado
            return Ok(new { usuario.IdUsuario, usuario.Nombre, usuario.Email });
        }

        // Endpoint POST para iniciar sesión: /api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            // Intenta obtener un token JWT válido con las credenciales recibidas
            var token = await _authService.Login(loginDTO);

            // Si el token es null, las credenciales son incorrectas
            if (token == null)
            {
                // Retorna error 401 Unauthorized con mensaje
                return Unauthorized("Credenciales incorrectas");
            }

            // Retorna el token JWT si el login fue exitoso
            return Ok(new { token });
        }
    }
}
