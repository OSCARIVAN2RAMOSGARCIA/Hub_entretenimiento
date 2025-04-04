window.onload = function() {
    function series() {
        let content_s = document.getElementById('conte');
        if (!content_s) {
            console.error("El contenedor #conte no existe.");
            return;
        }
        
        let imageUrls = [
            'https://hips.hearstapps.com/hmg-prod/images/casa-papel-poster-fotogramas-1637170621.jpg?resize=980:*',
            'https://i.pinimg.com/474x/82/a5/28/82a5285dae1c0689395182a9eb593c10.jpg',
            'https://stylelovely.com/wp-content/uploads/2020/10/series-de-netflix-que-triunfan-Alguien_tiene_que_morir_Miniserie_de_TV.jpg',
            'https://i.pinimg.com/736x/aa/5c/f7/aa5cf753386ce4a702118209e8d0c75d.jpg',
            'https://www.drcommodore.it/wp-content/uploads/2020/12/lupin-vert.jpg',
            'https://i.ebayimg.com/images/g/Ym8AAOSw5H9jRT3d/s-l1200.jpg'
        ];
        
        imageUrls.forEach(url => {
            let divSerie = document.createElement('div');
            divSerie.classList.add('col');
            divSerie.style.backgroundImage = `url(${url})`;
            content_s.appendChild(divSerie);
        });

        // Asegurarse que los elementos están cargados
        setTimeout(() => {
            initCarousel();
        }, 100);
    }

    function initCarousel() {
        let index = 0;
        const carousel = document.querySelector('.carousel');
        const items = document.querySelectorAll('.col');
        
        if (!carousel || items.length === 0) {
            console.error("Elementos del carrusel no encontrados");
            return;
        }

        const itemWidth = items[0].offsetWidth;
        const step = itemWidth + 10;
        const maxIndex = items.length - 1;

        function updateCarousel() {
            carousel.style.transform = `translateX(-${index * step}px)`;
            
            // Actualizar estado de los botones
            const prevBtn = document.getElementById('prev');
            const nextBtn = document.getElementById('next');
            
            if (prevBtn) prevBtn.disabled = index <= 0;
            if (nextBtn) nextBtn.disabled = index >= maxIndex;
        }

        // Configurar eventos
        const nextBtn = document.getElementById('next');
        const prevBtn = document.getElementById('prev');
        
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

        // Teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' && index < maxIndex) {
                index++;
                updateCarousel();
            } else if (e.key === 'ArrowLeft' && index > 0) {
                index--;
                updateCarousel();
            }
        });

        // Redimensionamiento
        window.addEventListener('resize', () => {
            const newItemWidth = items[0].offsetWidth;
            const newStep = newItemWidth + 10;
            step = newStep;
            updateCarousel();
        });

        updateCarousel();
    }

    series();
};