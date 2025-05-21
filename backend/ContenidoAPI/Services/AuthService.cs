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
        Task<Usuario> Registro(RegistroDTO registroDTO); // Método para registrar un nuevo usuario
        Task<string> Login(LoginDTO loginDTO); // Método para iniciar sesión
        Task<bool> ExisteUsuario(string email); // Verifica si el email ya está registrado
    }

    // Implementación del servicio de autenticación
    public class AuthService : IAuthService
    {
        // Inyectamos el contexto de base de datos y la configuración de la app
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // Verifica si ya hay un usuario con ese email en la base de datos
        public async Task<bool> ExisteUsuario(string email)
        {
            return await _context.Usuarios.AnyAsync(u => u.Email == email);
        }

        // Registra un nuevo usuario en la base de datos
        public async Task<Usuario> Registro(RegistroDTO registroDTO)
        {
            // Creamos el hash y la salt de la contraseña (seguridad)
            CrearPasswordHash(registroDTO.Password, out byte[] passwordHash, out byte[] passwordSalt);

            // Creamos el objeto usuario con los datos recibidos
            var usuario = new Usuario
            {
                Nombre = registroDTO.Nombre,
                Email = registroDTO.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                FechaRegistro = DateTime.Now
            };

            // Agregamos el usuario a la base de datos
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync(); // Guardamos los cambios

            return usuario;
        }

        // Método para iniciar sesión y devolver un token si el login es correcto
        public async Task<string> Login(LoginDTO loginDTO)
        {
            // Buscamos el usuario por email
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == loginDTO.Email);

            // Si el usuario no existe o los datos están mal, devolvemos null
            if (usuario == null || 
                usuario.PasswordHash == null || 
                usuario.PasswordSalt == null)
            {
                return null;
            }

            // Validamos que los datos almacenados sean correctos
            if (!(usuario.PasswordHash is byte[]) || !(usuario.PasswordSalt is byte[]))
            {
                throw new InvalidOperationException("Formato de contraseña inválido en la BD");
            }

            // Verificamos si la contraseña es correcta
            if (!VerificarPasswordHash(loginDTO.Password, usuario.PasswordHash, usuario.PasswordSalt))
            {
                return null;
            }

            // Si todo está bien, generamos y devolvemos un token JWT
            return CrearToken(usuario);
        }

        // Genera un hash y una salt para guardar la contraseña de forma segura
        private void CrearPasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512()) // Algoritmo para encriptar
            {
                passwordSalt = hmac.Key; // Guardamos la "sal" (clave aleatoria)
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password)); // Encriptamos la contraseña
            }
        }

        // Verifica si la contraseña ingresada coincide con el hash guardado
        private bool VerificarPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt)) // Usamos la misma "sal" para comparar
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash); // Comparamos los dos hashes
            }
        }

        // Crea un JWT (token) que se usa para autorizar al usuario
        private string CrearToken(Usuario usuario)
        {
            // Definimos los datos (claims) que irán dentro del token
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, usuario.IdUsuario.ToString()),
                new Claim(ClaimTypes.Email, usuario.Email)
            };

            // Obtenemos la clave secreta desde el archivo de configuración
            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            // Definimos las credenciales de firma del token
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            // Creamos el objeto que describe el token
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1), // El token expira en 1 día
                SigningCredentials = creds
            };

            // Generamos y devolvemos el token como string
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
