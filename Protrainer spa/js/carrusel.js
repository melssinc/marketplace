// CARRUSEL MODERNO - Protrainer SPA
document.addEventListener('DOMContentLoaded', function() {
    console.log('Iniciando carrusel...');
    
    const track = document.getElementById('carouselTrack');
    const dotsContainer = document.getElementById('carouselDots');
    const nextButton = document.querySelector('.carousel-moderno-btn.next-btn');
    const prevButton = document.querySelector('.carousel-moderno-btn.prev-btn');
    
    if (!track) {
        console.error('No se encontro el elemento carouselTrack');
        return;
    }
    
    let currentSlide = 0;
    let totalSlides = 0;
    const TOTAL_IMAGENES = 37;
    
    function crearCarrusel() {
        track.innerHTML = '';
        
        let imagenesPorSlide = 6;
        if (window.innerWidth <= 992) {
            imagenesPorSlide = 4;
        }
        if (window.innerWidth <= 576) {
            imagenesPorSlide = 2;
        }
        
        totalSlides = Math.ceil(TOTAL_IMAGENES / imagenesPorSlide);
        console.log('Creando ' + totalSlides + ' slides');
        
        for (let slideIndex = 0; slideIndex < totalSlides; slideIndex++) {
            const slideDiv = document.createElement('div');
            slideDiv.className = 'carousel-moderno-slide';
            
            const startImg = slideIndex * imagenesPorSlide;
            const endImg = Math.min(startImg + imagenesPorSlide, TOTAL_IMAGENES);
            
            for (let i = startImg; i < endImg; i++) {
                const imgNum = i + 1;
                const img = document.createElement('img');
                img.src = 'images/alumno' + imgNum + '.jpg';
                img.alt = 'Cliente ' + imgNum + ' transformado con ProTrainer';
                img.className = 'resultado-img';
                img.loading = 'lazy';
                
                img.onerror = function() {
                    console.log('Imagen ' + imgNum + ' no encontrada');
                    this.onerror = null;
                    this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="#f0f0f0"/><text x="150" y="100" font-family="Arial" font-size="14" fill="#666" text-anchor="middle">Imagen ' + imgNum + '</text></svg>';
                };
                
                slideDiv.appendChild(img);
            }
            
            track.appendChild(slideDiv);
        }
        
        crearPuntos();
        actualizarPosicion();
        console.log('Carrusel creado exitosamente');
    }
    
    function crearPuntos() {
        dotsContainer.innerHTML = '';
        
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-moderno-dot';
            if (i === 0) {
                dot.classList.add('active');
            }
            dot.setAttribute('aria-label', 'Ir al slide ' + (i + 1));
            dot.addEventListener('click', function() {
                irASlide(i);
            });
            dotsContainer.appendChild(dot);
        }
    }
    
    function irASlide(indice) {
        if (indice < 0 || indice >= totalSlides) return;
        currentSlide = indice;
        actualizarPosicion();
    }
    
    function siguienteSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            actualizarPosicion();
        }
    }
    
    function anteriorSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            actualizarPosicion();
        }
    }
    
    function actualizarPosicion() {
        track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
        
        const dots = document.querySelectorAll('.carousel-moderno-dot');
        dots.forEach(function(dot, index) {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        if (prevButton) {
            prevButton.disabled = currentSlide === 0;
            prevButton.style.opacity = prevButton.disabled ? '0.5' : '1';
        }
        
        if (nextButton) {
            nextButton.disabled = currentSlide === totalSlides - 1;
            nextButton.style.opacity = nextButton.disabled ? '0.5' : '1';
        }
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', siguienteSlide);
    }
    
    if (prevButton) {
        prevButton.addEventListener('click', anteriorSlide);
    }
    
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            crearCarrusel();
        }, 250);
    });
    
    crearCarrusel();
});