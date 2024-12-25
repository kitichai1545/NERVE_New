const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

hamburger.addEventListener('click', () => {
    menu.classList.toggle('active'); // เพิ่ม/ลบ class active เมื่อคลิก
});