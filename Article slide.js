const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');
const carouselItems = document.querySelector('.hero6-con');
const cardWidth = 342 + 35; // ความกว้างของการ์ดรวมกับช่องว่าง (gap)

let currentPosition = 0; // ตำแหน่งเริ่มต้นคือ 0
let maxScroll = 0; // ค่าการเลื่อนสูงสุด

// ฟังก์ชั่นคำนวณค่าการเลื่อนสูงสุด
function calculateMaxScroll() {
    maxScroll = carouselItems.scrollWidth - carouselItems.clientWidth; // คำนวณค่าการเลื่อนสูงสุด
}

// ฟังก์ชั่นเลื่อนการ์ดไปข้างขวา
rightArrow.addEventListener('click', () => {
    calculateMaxScroll(); // ตรวจสอบและคำนวณค่าการเลื่อนทุกครั้งที่กดเลื่อนขวา
    if (currentPosition < maxScroll) {
        currentPosition = Math.min(currentPosition + cardWidth, maxScroll);
        carouselItems.style.transform = `translateX(-${currentPosition}px)`;
    }
});

// ฟังก์ชั่นเลื่อนการ์ดไปข้างซ้าย
leftArrow.addEventListener('click', () => {
    if (currentPosition > 0) {
        currentPosition = Math.max(currentPosition - cardWidth, 0);
        carouselItems.style.transform = `translateX(-${currentPosition}px)`;
    }
});

// ตั้งค่าเริ่มต้นเมื่อหน้าโหลดเสร็จสมบูรณ์
window.addEventListener('load', () => {
    // หน่วงเวลาเล็กน้อยเพื่อให้คอนเทนต์โหลดครบถ้วน
    setTimeout(() => {
        calculateMaxScroll(); // คำนวณค่าการเลื่อนสูงสุดเมื่อโหลดหน้าเว็บเสร็จ
        currentPosition = 0; // รีเซ็ตตำแหน่งให้เป็น 0
        carouselItems.style.transform = `translateX(0px)`; // ตั้งให้การ์ดแรกแสดงเสมอ
    }, 100); // เลือกหน่วงเวลาให้แน่ใจว่าเนื้อหาถูกโหลดครบถ้วน
});

// คำนวณค่าการเลื่อนใหม่เมื่อมีการเปลี่ยนแปลงขนาดหน้าจอ
window.addEventListener('resize', calculateMaxScroll);