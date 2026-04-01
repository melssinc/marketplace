document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('reviewsTrack');
    const btnNext = document.getElementById('nextReview');
    const btnPrev = document.getElementById('prevReview');
    if (!track || !btnNext || !btnPrev) return;

    let index = 0;
    let interval;

    function startSlider() {
        interval = setInterval(nextReview, 4000);
    }

    function stopSlider() {
        clearInterval(interval);
    }

    function nextReview() {
        const cards = document.querySelectorAll('.review-card-custom');
        const totalCards = cards.length;
        
        let visibleCards = 3;
        if (window.innerWidth <= 992) visibleCards = 2;
        if (window.innerWidth <= 600) visibleCards = 1;
        
        index++;
        
        if (index > totalCards - visibleCards) {
            index = 0;
        }
        
        updatePosition();
    }

    function updatePosition() {
        const cards = document.querySelectorAll('.review-card-custom');
        if (cards.length === 0) return;
        const cardWidth = cards[0].offsetWidth + 20; // Ancho + gap de 20px
        track.style.transform = `translateX(-${index * cardWidth}px)`;
    }

    btnNext.addEventListener('click', () => { stopSlider(); nextReview(); });
    btnPrev.addEventListener('click', () => { 
        stopSlider();
        index = index > 0 ? index - 1 : 0;
        updatePosition();
    });

    window.addEventListener('resize', () => {
        index = 0;
        updatePosition();
    });

    startSlider();
    track.parentElement.addEventListener('mouseenter', stopSlider);
    track.parentElement.addEventListener('mouseleave', startSlider);

    // Lógica para el botón "Leer más"
    track.addEventListener('click', function(e) {
        if (e.target.classList.contains('review-read-more')) {
            e.preventDefault();
            stopSlider();
            const card = e.target.closest('.review-card-custom');
            card.classList.toggle('expanded');
            e.target.textContent = card.classList.contains('expanded') ? 'Leer menos' : 'Leer más';
        }
    });
});