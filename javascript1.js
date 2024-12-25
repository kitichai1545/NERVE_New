const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const dots = document.querySelectorAll('.dot');
const items = document.querySelector('.carousel-items');

let index = 0;

function updateCarousel() {
    items.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

leftArrow.addEventListener('click', () => {
    index = (index === 0) ? dots.length - 1 : index - 1;
    updateCarousel();
});

rightArrow.addEventListener('click', () => {
    index = (index === dots.length - 1) ? 0 : index + 1;
    updateCarousel();
});

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        index = i;
        updateCarousel();
    });
});