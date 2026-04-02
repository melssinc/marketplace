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
            abrirReviewModal(card);
        }
    });

    function abrirReviewModal(card) {
        let modal = document.getElementById('reviewModal');
        
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'reviewModal';
            modal.className = 'review-modal';
            modal.innerHTML = `
                <div class="review-modal-content">
                    <span class="review-modal-close">&times;</span>
                    <div id="reviewModalBody"></div>
                </div>
            `;
            document.body.appendChild(modal);
            modal.querySelector('.review-modal-close').onclick = () => modal.style.display = "none";
            modal.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };
        }

        const body = document.getElementById('reviewModalBody');
        const header = card.querySelector('.review-card-header').innerHTML;
        const stars = card.querySelector('.review-stars-static').innerHTML;
        const text = card.querySelector('.review-text-content').innerText;

        body.innerHTML = `
            <div class="review-card-header">${header}</div>
            <div class="review-stars-static" style="margin: 15px 0">${stars}</div>
            <div class="review-text-full">${text}</div>
        `;
        modal.style.display = "flex";
    }
});
