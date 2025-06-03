// Importamos las librerías necesarias para trabajar con seguridad, JWT, base de datos, etc.
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using ContenidoAPI.Models;
using ContenidoAPI.Models.DTOs;
using ContenidoAPI.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace ContenidoAPI.Services
{
    // Esta interfaz define qué métodos debe tener el servicio de autenticación
     public interface IAuthService
    {
        Task<Usuario> Registro(RegistroDTO registroDTO);
        Task<ResultadoLoginDTO> Login(LoginDTO loginDTO); // Cambiado para retornar DTO completo
        Task<bool> ExisteUsuario(string email);
    }
    // Implementación del servicio de autenticación
   public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<bool> ExisteUsuario(string email)
        {
            return await _context.Usuarios.AnyAsync(u => u.Email == email);
        }

        public async Task<Usuario> Registro(RegistroDTO registroDTO)
        {
            CrearPasswordHash(registroDTO.Password, out byte[] passwordHash, out byte[] passwordSalt);

            var usuario = new Usuario
            {
                Nombre = registroDTO.Nombre,
                Email = registroDTO.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                FechaRegistro = DateTime.Now
            };

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return usuario;
        }

        public async Task<ResultadoLoginDTO> Login(LoginDTO loginDTO)
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == loginDTO.Email);

            if (usuario == null || 
                usuario.PasswordHash == null || 
                usuario.PasswordSalt == null)
            {
                return null;
            }

            if (!VerificarPasswordHash(loginDTO.Password, usuario.PasswordHash, usuario.PasswordSalt))
            {
                return null;
            }

            var token = CrearToken(usuario);

            return new ResultadoLoginDTO
            {
                Token = token,
                IdUsuario = usuario.IdUsuario
            };
        }

        private void CrearPasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerificarPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        private string CrearToken(Usuario usuario)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, usuario.IdUsuario.ToString()),
                new Claim(ClaimTypes.Email, usuario.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(2),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }

}
