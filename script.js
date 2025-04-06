// Definir la clase Favorito con un constructor que reciba 'nombre' e 'img'
class Favorito {
    constructor(nombre, img) {
        this.nombre = nombre;
        this.img = img;
    }
}

// Crear un array para almacenar los favoritos
let listaFavoritos = [];

// Obtener el modal y los botones
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModalBtn');
const closeBtn = document.getElementById('closeBtn');
const playBtn = document.getElementById('playBtn');
const favoritesBtn = document.getElementById('favoritesBtn');
const hideBtn = document.getElementById('hideBtn');

// Cerrar el modal cuando se haga clic en la "X"
closeBtn.onclick = function() {
    modal.style.display = 'none';
}

// Función para cargar datos y configurar el carrusel
function loadCarouselData(jsonUrl, containerId, prevBtnId, nextBtnId, dataKey, favContainerId) {
    let content = document.getElementById(containerId);
    if (!content) {
        console.error(`El contenedor ${containerId} no existe.`);
        return;
    }

    // Limpiar el contenedor antes de agregar nuevos elementos
    content.innerHTML = '';

    // Cargar el archivo JSON
    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            // Extraer las películas o series del JSON dependiendo del dataKey (peliculas o series)
            let items = data.hub_entretenimiento[dataKey];

            // Verificar que se han encontrado elementos
            if (!items || items.length === 0) {
                console.error("No se encontraron elementos en el archivo JSON.");
                return;
            }

            // Recorrer los elementos y agregarlos al contenedor
            items.forEach(item => {
                let divItem = document.createElement('div');
                divItem.classList.add('col');

                // Crear una etiqueta <img> y asignar los atributos
                let img = document.createElement('img');
                img.src = item.img; // Asumimos que 'img' es el campo con la URL de la imagen
                img.alt = item.nombre; // Asumimos que 'nombre' es el campo con el nombre de la película o serie
                
                // Agregar la clase 'layout' a la imagen
                img.classList.add('layout');

                // Asignar un evento de clic al contenedor del divItem
                divItem.addEventListener('click', () => {
                    let titulo = document.getElementById('h2Opciones');
                    
                    // Cambiar el texto del <h1>
                    titulo.innerText = `Opciones para ${item.nombre}`;
                    modal.style.display = 'flex';  // Modal abierto
                    // Al hacer clic, mostrará las opciones para ocultar, agregar a favoritos o reproducir
                    let currentItem = item; // Guardar el item actual

                    // Lógica de los botones dentro del modal
                    hideBtn.onclick = function() {
                        divItem.style.display = 'none'; // Ocultar el item
                        modal.style.display = 'none';  // Cerrar el modal
                        alert(`${currentItem.nombre} ha sido oculto.`);
                    }

                    favoritesBtn.onclick = function() {
                        // Crear un nuevo objeto Favorito y agregarlo a la lista
                        let nuevoFavorito = new Favorito(currentItem.nombre, currentItem.img);
                        listaFavoritos.push(nuevoFavorito);
                        alert(`${currentItem.nombre} añadido a favoritos!`);
                        updateFavoritos(favContainerId); // Actualizar el carrusel de favoritos
                        modal.style.display = 'none';  // Cerrar el modal
                    }

                    playBtn.onclick = function() {
                        alert(`Reproduciendo ${currentItem.nombre}...`);
                        modal.style.display = 'none';  // Cerrar el modal
                    }
                });

                // Agregar la imagen al divItem
                divItem.appendChild(img);

                // Agregar el divItem al contenedor del carrusel
                content.appendChild(divItem);
            });

            // Asegurarse de que los elementos estén cargados y el carrusel se inicie
            setTimeout(() => {
                initCarousel(containerId, prevBtnId, nextBtnId);  // Inicializamos el carrusel
            }, 100);
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
        });
}

// Función para inicializar el carrusel
function initCarousel(containerId, prevBtnId, nextBtnId) {
    let index = 0;
    const carousel = document.getElementById(containerId);
    const items = carousel.querySelectorAll('.col');

    if (!carousel || items.length === 0) {
        console.error("Elementos del carrusel no encontrados");
        return;
    }

    const itemWidth = items[0].offsetWidth;
    let step = itemWidth + 10;
    const maxIndex = items.length - 1;

    function updateCarousel() {
        carousel.style.transform = `translateX(-${index * step}px)`;

        // Actualizar estado de los botones
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);

        if (prevBtn) prevBtn.disabled = index <= 0;
        if (nextBtn) nextBtn.disabled = index >= maxIndex;
    }

    // Configurar eventos para los botones
    const nextBtn = document.getElementById(nextBtnId);
    const prevBtn = document.getElementById(prevBtnId);

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (index < maxIndex) {
                index++;
                updateCarousel();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (index > 0) {
                index--;
                updateCarousel();
            }
        });
    }

    // Redimensionamiento
    window.addEventListener('resize', () => {
        const newItemWidth = items[0].offsetWidth;
        step = newItemWidth + 10;
        updateCarousel();
    });

    updateCarousel();
}

// Función para actualizar el carrusel de favoritos
function updateFavoritos(favContainerId) {
    let favContent = document.getElementById(favContainerId);
    if (!favContent) {
        console.error(`El contenedor ${favContainerId} no existe.`);
        return;
    }

    // Limpiar el contenedor de favoritos antes de agregar los nuevos elementos
    favContent.innerHTML = '';

    // Si no hay favoritos, ocultar el carrusel
    if (listaFavoritos.length === 0) {
        document.getElementById('favoritos-carousel').style.display = 'none';
    } else {
        document.getElementById('favoritos-carousel').style.display = 'block';
        
        // Recorrer los favoritos y agregarlos al contenedor
        listaFavoritos.forEach(fav => {
            let divItem = document.createElement('div');
            divItem.classList.add('col');

            // Crear una etiqueta <img> y asignar los atributos
            let img = document.createElement('img');
            img.src = fav.img; // La imagen del favorito
            img.alt = fav.nombre; // El nombre del favorito

            // Agregar la clase 'layout' a la imagen
            img.classList.add('layout');

            // Agregar la imagen al divItem
            divItem.appendChild(img);

            // Agregar el divItem al contenedor del carrusel de favoritos
            favContent.appendChild(divItem);
        });

        // Inicializar el carrusel de favoritos
        setTimeout(() => {
            initCarousel(favContainerId, 'prev-favoritos', 'next-favoritos');
        }, 100);
    }
}
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar elementos con selectores más específicos
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('nav');
    const navList = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Función para alternar el menú
    function toggleMenu() {
        hamburgerBtn.classList.toggle('active');
        mainNav.classList.toggle('active');
        navList.classList.toggle('active');
        
        // Bloquear scroll de manera más confiable
        if (hamburgerBtn.classList.contains('active')) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
    }
    
    // Evento del botón hamburguesa
    hamburgerBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Evita que el evento se propague
        toggleMenu();
    });
    
    // Cerrar menú al hacer clic en enlaces
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 771) {
                toggleMenu();
            }
        });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 771 && 
            !e.target.closest('nav') && 
            !e.target.closest('.hamburger-menu') &&
            hamburgerBtn.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Cerrar menú al redimensionar
    window.addEventListener('resize', function() {
        if (window.innerWidth > 771 && hamburgerBtn.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Llamamos a la función para cargar las películas y series y configurar los carruseles
loadCarouselData('komodoTV.json', 'conte-peliculas', 'prev-peliculas', 'next-peliculas', 'peliculas', 'conte-favoritos');  // Para Peliculas
loadCarouselData('komodoTV.json', 'conte-series', 'prev-series', 'next-series', 'series', 'conte-favoritos');  // Para Series
