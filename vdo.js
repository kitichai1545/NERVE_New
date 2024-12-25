window.onload = function() {
    const videos = document.querySelectorAll('video'); // เลือกวิดีโอทั้งหมด

    if (window.innerWidth <= 768) { // เช็คถ้าขนาดหน้าจอเล็กกว่า 768px
        videos.forEach(video => {
            video.pause(); // หยุดเล่นวิดีโอ
            video.removeAttribute('controls'); // ลบปุ่มควบคุม
            video.style.pointerEvents = 'none'; // ป้องกันไม่ให้ผู้ใช้คลิกที่วิดีโอ
        });
    }
};