CREATE DATABASE KomodoTV;
GO

USE KomodoTV;
GO

-- TiposContenido
CREATE TABLE TiposContenido (
    IdTipo INT PRIMARY KEY IDENTITY(1,1),
    Nombre VARCHAR(20) NOT NULL,
    Descripcion VARCHAR(100)
);

-- Usuarios
CREATE TABLE Usuarios (
    IdUsuario INT PRIMARY KEY IDENTITY(1,1),
    Nombre VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    PasswordHash VARBINARY(MAX) NOT NULL,
    PasswordSalt VARBINARY(MAX) NOT NULL,
    FechaRegistro DATETIME DEFAULT GETDATE()
);

-- Contenidos
CREATE TABLE Contenidos (
    IdContenido INT PRIMARY KEY IDENTITY(1,1),
    Nombre VARCHAR(100) NOT NULL,
    Genero VARCHAR(100) NOT NULL,
    Duracion VARCHAR(50) NOT NULL,
    Calificacion DECIMAL(3,1) NOT NULL,
    Imagen VARCHAR(255) NOT NULL,
    IdTipo INT NOT NULL,
    FOREIGN KEY (IdTipo) REFERENCES TiposContenido(IdTipo)
);

-- Favoritos
CREATE TABLE Favoritos (
    IdUsuario INT NOT NULL,
    IdContenido INT NOT NULL,
    FechaAgregado DATETIME DEFAULT GETDATE(),
    PRIMARY KEY (IdUsuario, IdContenido),
    FOREIGN KEY (IdUsuario) REFERENCES Usuarios(IdUsuario),
    FOREIGN KEY (IdContenido) REFERENCES Contenidos(IdContenido)
);

INSERT INTO TiposContenido (IdTipo, Nombre, Descripcion) VALUES
(1, 'Película', 'Contenido cinematográfico'),
(2, 'Serie', 'Contenido episódico');


INSERT INTO Contenidos (IdContenido, Nombre, Genero, Duracion, Calificacion, Imagen, IdTipo) VALUES
(1, 'Breaking Bad', 'Crimen, Drama, Suspenso', '47 min por episodio', 9.5, 'assets/img/breaking_bad.webp', 2),
(2, 'Stranger Things', 'Drama, Fantasía, Horror', '50 min por episodio', 8.8, 'assets/img/stranger_things.webp', 2),
(3, 'Game of Thrones', 'Acción, Aventura, Drama', '60 min por episodio', 9.3, 'assets/img/game_of_thrones.webp', 2),
(4, 'The Mandalorian', 'Acción, Aventura, Fantasía', '40 min por episodio', 8.8, 'assets/img/the_mandalorian.webp', 2),
(5, 'The Office', 'Comedia', '22 min por episodio', 8.9, 'assets/img/the_office.webp', 2),
(6, 'Friends', 'Comedia, Romance', '22 min por episodio', 8.9, 'assets/img/friends.webp', 2),
(7, 'The Witcher', 'Aventura, Drama, Fantasía', '60 min por episodio', 8.0, 'assets/img/the_witcher.webp', 2),
(8, 'Black Mirror', 'Drama, Ciencia ficción, Thriller', '60 min por episodio', 8.8, 'assets/img/black_mirror.webp', 2),
(9, 'Sherlock', 'Crimen, Drama, Misterio', '90 min por episodio', 9.1, 'assets/img/sherlock.webp', 2),
(10, 'Narcos', 'Crimen, Drama', '50 min por episodio', 8.8, 'assets/img/narcos.webp', 2),
(11, 'Money Heist', 'Crimen, Drama, Suspenso', '45 min por episodio', 8.3, 'assets/img/money_heist.webp', 2),
(12, 'The Boys', 'Acción, Comedia, Crimen', '60 min por episodio', 8.7, 'assets/img/the_boys.webp', 2),
(13, 'Peaky Blinders', 'Crimen, Drama', '60 min por episodio', 8.8, 'assets/img/peaky_blinders.webp', 2),
(14, 'The Crown', 'Biografía, Drama, Historia', '60 min por episodio', 8.7, 'assets/img/the_crown.webp', 2),
(15, 'The Umbrella Academy', 'Acción, Aventura, Comedia', '50 min por episodio', 8.0, 'assets/img/the_umbrella_academy.webp', 2),
(16, 'Chernobyl', 'Drama, Historia, Thriller', '60 min por episodio', 9.4, 'assets/img/chernobyl.webp', 2),
(17, 'Avengers: Endgame', 'Acción, Aventura, Ciencia ficción', '181 min', 8.4, 'assets/img/Avenger_Endgame_Poster_Oficial.webp', 1),
(18, 'Inception', 'Acción, Ciencia ficción, Misterio', '148 min', 8.8, 'assets/img/inception.webp', 1),
(19, 'The Dark Knight', 'Acción, Crimen, Drama', '152 min', 9.0, 'assets/img/the_Dark_Nigth.webp', 1),
(20, 'Titanic', 'Drama, Romance', '195 min', 7.8, 'assets/img/titanic.webp', 1),
(21, 'The Matrix', 'Acción, Ciencia ficción', '136 min', 8.7, 'assets/img/the_matrix.webp', 1),
(22, 'Interstellar', 'Aventura, Drama, Ciencia ficción', '169 min', 8.6, 'assets/img/Interstellar.webp', 1),
(23, 'The Lion King', 'Animación, Aventura, Drama', '88 min', 8.5, 'assets/img/The_Lion_King.webp', 1),
(24, 'Joker', 'Crimen, Drama, Thriller', '122 min', 8.5, 'assets/img/joker.webp', 1),
(25, 'Forrest Gump', 'Drama, Romance', '142 min', 8.8, 'assets/img/Forrest_Gump.webp', 1),
(26, 'Avatar', 'Acción, Aventura, Ciencia ficción', '162 min', 7.8, 'assets/img/Avatar.webp', 1),
(27, 'The Avengers', 'Acción, Aventura, Ciencia ficción', '143 min', 8.0, 'assets/img/The_Avengers.webp', 1),
(28, 'Guardians of the Galaxy', 'Acción, Aventura, Ciencia ficción', '121 min', 8.0, 'assets/img/Guardians_of_the_Galaxy.webp', 1),
(29, 'The Pursuit of Happyness', 'Drama', '117 min', 8.0, 'assets/img/The_Pursuit_of_Happyness.webp', 1),
(30, 'The Godfather', 'Crimen, Drama', '175 min', 9.2, 'assets/img/the_godfather.webp', 1),
(31, 'Pulp Fiction', 'Crimen, Drama', '154 min', 8.9, 'assets/img/pulp_fiction.webp', 1),
(32, 'The Shawshank Redemption', 'Drama', '142 min', 9.3, 'assets/img/the_shawshank_redemption.webp', 1),
(33, 'The Silence of the Lambs', 'Crimen, Drama, Thriller', '118 min', 8.6, 'assets/img/the_silence_of_the_lambs.webp', 1),
(34, 'The Dark Knight Rises', 'Acción, Crimen, Drama', '164 min', 8.4, 'assets/img/the_dark_knight_rises.webp', 1),
(35, 'Star Wars: Episode IV - A New Hope', 'Aventura, Ciencia ficción', '121 min', 8.6, 'assets/img/star_wars:_episode_iv_-_a_new_hope.webp', 1),
(36, 'Blade Runner 2049', 'Acción, Ciencia ficción, Drama', '163 min', 8.0, 'assets/img/blade_runner_2049.webp', 1),
(37, 'Gladiator', 'Acción, Aventura, Drama', '155 min', 8.5, 'assets/img/gladiator.webp', 1),
(38, 'The Revenant', 'Aventura, Drama, Suspenso', '156 min', 8.0, 'assets/img/the_revenant.webp', 1),
(39, 'Jurassic Park', 'Acción, Aventura, Ciencia ficción', '127 min', 8.1, 'assets/img/jurassic_park.webp', 1),
(40, 'Mad Max: Fury Road', 'Acción, Aventura, Ciencia ficción', '120 min', 8.1, 'assets/img/mad_max:_fury_road.webp', 1),
(41, 'Deadpool', 'Acción, Comedia, Ciencia ficción', '108 min', 8.0, 'assets/img/deadpool.webp', 1),
(42, 'Spider-Man: Into the Spider-Verse', 'Animación, Acción, Aventura', '117 min', 8.4, 'assets/img/spider-man:_into_the_spider-verse.webp', 1),
(43, 'Spider-Man: No Way Home', 'Acción, Aventura, Ciencia ficción', '148 min', 8.3, 'assets/img/spider-man:_no_way_home.webp', 1);
