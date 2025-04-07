// Definir la clase Favorito con un constructor que recibe 'nombre' e 'img'
class Favorito {
    constructor(nombre, img) {
        this.nombre = nombre;  // Guardamos el nombre del favorito
        this.img = img;        // Guardamos la URL de la imagen del favorito
    }
}

// Crear un array para almacenar los favoritos
let listaFavoritos = [];  // Lista vacía donde se guardarán los objetos Favorito

// Obtener el modal y los botones de la interfaz
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModalBtn');
const closeBtn = document.getElementById('closeBtn');
const playBtn = document.getElementById('playBtn');
const favoritesBtn = document.getElementById('favoritesBtn');
const hideBtn = document.getElementById('hideBtn');

// Cerrar el modal cuando se haga clic en la "X"
closeBtn.onclick = function() {
    modal.style.display = 'none';  // Cerramos el modal
}

// Función para cargar los datos y configurar el carrusel
function loadCarouselData(jsonUrl, containerId, prevBtnId, nextBtnId, dataKey, favContainerId) {
    let content = document.getElementById(containerId);  // Seleccionamos el contenedor del carrusel
    if (!content) {  // Si el contenedor no existe, mostramos un error
        console.error(`El contenedor ${containerId} no existe.`);
        return;
    }

    // Limpiar el contenedor antes de agregar nuevos elementos
    content.innerHTML = '';

    // Cargar el archivo JSON con las películas o series
    fetch(jsonUrl)
        .then(response => response.json())  // Parseamos la respuesta como JSON
        .then(data => {
            // Extraemos las películas o series del archivo JSON
            let items = data.hub_entretenimiento[dataKey];

            // Si no hay elementos, mostramos un error
            if (!items || items.length === 0) {
                console.error("No se encontraron elementos en el archivo JSON.");
                return;
            }

            // Iteramos sobre los elementos (películas o series)
            items.forEach(item => {
                let divItem = document.createElement('div');
                divItem.classList.add('col');  // Le agregamos la clase 'col' al div

                // Creamos la etiqueta <img> y le asignamos los atributos
                let img = document.createElement('img');
                img.src = item.img;  // Asignamos la URL de la imagen
                img.alt = item.nombre;  // Asignamos el nombre como texto alternativo

                // Agregamos la clase 'layout' a la imagen
                img.classList.add('layout');

                // Añadimos un evento de clic al divItem
                divItem.addEventListener('click', () => {
                    let titulo = document.getElementById('h2Opciones');
                    
                    // Cambiamos el texto de <h2> para mostrar el nombre del item seleccionado
                    titulo.innerText = `Opciones para ${item.nombre}`;
                    modal.style.display = 'flex';  // Mostramos el modal

                    let currentItem = item;  // Guardamos el item actual para usarlo en los botones

                    // Función para ocultar el item del carrusel
                    hideBtn.onclick = function() {
                        divItem.style.display = 'none';  // Ocultamos el div del carrusel
                        modal.style.display = 'none';  // Cerramos el modal
                        alert(`${currentItem.nombre} ha sido oculto.`);
                    }

                    // Función para agregar a favoritos
                    favoritesBtn.onclick = function() {
                        let nuevoFavorito = new Favorito(currentItem.nombre, currentItem.img);  // Creamos un nuevo Favorito
                        listaFavoritos.push(nuevoFavorito);  // Lo agregamos a la lista de favoritos
                        alert(`${currentItem.nombre} añadido a favoritos!`);
                        updateFavoritos(favContainerId);  // Actualizamos el carrusel de favoritos
                        modal.style.display = 'none';  // Cerramos el modal
                    }

                    // Función para reproducir el item seleccionado
                    playBtn.onclick = function() {
                        alert(`Reproduciendo ${currentItem.nombre}...`);
                        modal.style.display = 'none';  // Cerramos el modal
                    }
                });

                // Agregamos la imagen al divItem
                divItem.appendChild(img);

                // Agregamos el divItem al contenedor del carrusel
                content.appendChild(divItem);
            });

            // Aseguramos que los elementos estén cargados antes de inicializar el carrusel
            setTimeout(() => {
                initCarousel(containerId, prevBtnId, nextBtnId);  // Inicializamos el carrusel
            }, 100);
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
        });
}

// Función para inicializar el carrusel (para el desplazamiento)
function initCarousel(containerId, prevBtnId, nextBtnId) {
    let index = 0;
    const carousel = document.getElementById(containerId);  // Obtenemos el contenedor del carrusel
    const items = carousel.querySelectorAll('.col');  // Obtenemos todos los elementos del carrusel

    if (!carousel || items.length === 0) {  // Si no hay elementos, mostramos un error
        console.error("Elementos del carrusel no encontrados");
        return;
    }

    const itemWidth = items[0].offsetWidth;  // Ancho de los elementos
    let step = itemWidth + 10;  // Definimos el paso de desplazamiento
    const maxIndex = items.length - 1;  // Índice máximo del carrusel

    // Función para actualizar la posición del carrusel
    function updateCarousel() {
        carousel.style.transform = `translateX(-${index * step}px)`;  // Movemos el carrusel

        // Actualizamos el estado de los botones (habilitar/deshabilitar)
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);

        if (prevBtn) prevBtn.disabled = index <= 0;  // Deshabilitar el botón anterior si estamos en el inicio
        if (nextBtn) nextBtn.disabled = index >= maxIndex;  // Deshabilitar el botón siguiente si estamos al final
    }

    // Configuramos los eventos para los botones de navegación
    const nextBtn = document.getElementById(nextBtnId);
    const prevBtn = document.getElementById(prevBtnId);

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (index < maxIndex) {  // Si no hemos llegado al final, aumentamos el índice
                index++;
                updateCarousel();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (index > 0) {  // Si no estamos en el inicio, disminuimos el índice
                index--;
                updateCarousel();
            }
        });
    }

    // Redimensionamiento del carrusel en caso de cambio de tamaño de la ventana
    window.addEventListener('resize', () => {
        const newItemWidth = items[0].offsetWidth;  // Obtenemos el nuevo ancho
        step = newItemWidth + 10;  // Ajustamos el paso de desplazamiento
        updateCarousel();
    });

    updateCarousel();  // Actualizamos el carrusel al inicio
}

// Función para actualizar el carrusel de favoritos
function updateFavoritos(favContainerId) {
    let favContent = document.getElementById(favContainerId);  // Seleccionamos el contenedor de favoritos
    if (!favContent) {  // Si el contenedor no existe, mostramos un error
        console.error(`El contenedor ${favContainerId} no existe.`);
        return;
    }

    // Limpiar el contenedor de favoritos antes de agregar nuevos elementos
    favContent.innerHTML = '';

    // Si no hay favoritos, ocultamos el carrusel de favoritos
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
            img.src = fav.img;  // Asignamos la imagen del favorito
            img.alt = fav.nombre;  // Asignamos el nombre del favorito

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

// Evento para cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.querySelector('.hamburger-menu');  // Botón hamburguesa
    const mainNav = document.querySelector('nav');  // Menú de navegación
    const navList = document.querySelector('nav ul');  // Lista de enlaces en el menú
    const navLinks = document.querySelectorAll('nav ul li a');  // Todos los enlaces en el menú
    
    // Función para alternar el menú de navegación
    function toggleMenu() {
        hamburgerBtn.classList.toggle('active');
        mainNav.classList.toggle('active');
        navList.classList.toggle('active');
        
        // Bloquear el scroll cuando el menú esté abierto
        if (hamburgerBtn.classList.contains('active')) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
    }

    // Evento del botón hamburguesa para abrir/cerrar el menú
    hamburgerBtn.addEventListener('click', function(e) {
        e.stopPropagation();  // Evita que el evento se propague
        toggleMenu();
    });

    // Cerrar el menú al hacer clic en un enlace del menú
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 771) {  // Si la pantalla es pequeña, cerramos el menú
                toggleMenu();
            }
        });
    });

    // Cerrar el menú si se hace clic fuera de él
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 771 && 
            !e.target.closest('nav') && 
            !e.target.closest('.hamburger-menu') &&
            hamburgerBtn.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Cerrar el menú al redimensionar la ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 771 && hamburgerBtn.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Función para hacer scroll a un elemento específico
function scrollToElement(elemento) {
    const targetElement = document.getElementById(elemento);  // Obtenemos el elemento objetivo
    targetElement.scrollIntoView({
        behavior: 'smooth',  // Desplazamiento suave
        block: 'center'      // Centrar el elemento en la vista
    });
}

// Cargar los datos de películas y series y configurar los carruseles
loadCarouselData('komodoTV.json', 'conte-peliculas', 'prev-peliculas', 'next-peliculas', 'peliculas', 'conte-favoritos');  // Para Peliculas
loadCarouselData('komodoTV.json', 'conte-series', 'prev-series', 'next-series', 'series', 'conte-favoritos');  // Para Series
