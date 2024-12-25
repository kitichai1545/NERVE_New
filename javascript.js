const container = document.querySelector('.img-container');

document.querySelector('.start').addEventListener('click', () => {
    container.style.animationPlayState = 'running'; // เริ่มการเคลื่อนที่
});

document.querySelector('.stop').addEventListener('click', () => {
    container.style.animationPlayState = 'paused'; // หยุดการเคลื่อนที่
});