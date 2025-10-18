const carousel = document.getElementById('carousel');
const baseCards = Array.from(document.querySelectorAll('.card'));
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const dotsContainer = document.getElementById('dots');
let index = 0;
let interval;
const total = baseCards.length;

// Cria clones para loop infinito
baseCards.forEach(card => carousel.appendChild(card.cloneNode(true)));
baseCards.forEach(card => carousel.insertBefore(card.cloneNode(true), carousel.firstChild));

let allCards = Array.from(document.querySelectorAll('.card'));
let cardWidth = allCards[0].offsetWidth;

// Posiciona o carrossel no início (meio da lista de clones)
carousel.style.transform = `translateX(-${total * cardWidth}px)`;

// Cria bolinhas
for (let i = 0; i < total; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        moveToIndex(i);
        restartAuto();
    });
    dotsContainer.appendChild(dot);
}
const dots = document.querySelectorAll('.dot');

function getCardWidth() {
    return allCards[0].offsetWidth;
}

function updateDots() {
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === ((index % total + total) % total));
    });
}

function moveToIndex(newIndex) {
    index = newIndex;
    const offset = (total + index) * getCardWidth();
    carousel.style.transition = 'transform 0.5s ease-out';
    carousel.style.transform = `translateX(-${offset}px)`;
    updateDots();
}

carousel.addEventListener('transitionend', () => {
    const visible = getCardWidth();
    if (index <= -total) {
        carousel.style.transition = 'none';
        index = 0;
        carousel.style.transform = `translateX(-${total * visible}px)`;
    } else if (index >= total) {
        carousel.style.transition = 'none';
        index = 0;
        carousel.style.transform = `translateX(-${total * visible}px)`;
    }
});

function nextSlide() {
    moveToIndex(index + 1);
}

function prevSlide() {
    moveToIndex(index - 1);
}

next.addEventListener('click', () => {
    nextSlide();
    restartAuto();
});

prev.addEventListener('click', () => {
    prevSlide();
    restartAuto();
});

function autoSlide() {
    interval = setInterval(nextSlide, 4000);
}

function restartAuto() {
    clearInterval(interval);
    autoSlide();
}

window.addEventListener('resize', () => {
    cardWidth = getCardWidth();
    carousel.style.transition = 'none';
    carousel.style.transform = `translateX(-${(total + index) * cardWidth}px)`;
});

// Pausar auto slide ao passar o mouse
carousel.addEventListener('mouseenter', () => {
    clearInterval(interval);
});

carousel.addEventListener('mouseleave', () => {
    autoSlide();
});

autoSlide();