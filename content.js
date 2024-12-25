window.onload = function() {
    // ตรวจสอบว่ามีคอนเทนต์ 1 และ 2 ในหน้า
    let content1 = document.getElementById('content1');
    let content2 = document.getElementById('content2');

    if (!content1 || !content2) {
        console.log("ไม่พบคอนเทนต์ที่ต้องการ");
        return;
    }

    // ตรวจสอบว่ามีปุ่มในหน้า (อ้างอิงจาก index1 หรือ index2)
    let btn = document.getElementById('openPopupBtn') || document.getElementById('openPopupBtn2');

    if (!btn) {
        console.log("ไม่พบปุ่มในหน้า");
        return;
    }

    // เพิ่มคลาส visible ให้ปุ่มหลังจากโหลดหน้า
    btn.classList.add('visible');

    let currentContent = 1; // เก็บสถานะของคอนเทนต์ที่แสดงอยู่

    // เริ่มต้นด้วยการแสดงคอนเทนต์แรก
    content1.classList.add('visible');

    // ตั้งเวลาให้คอนเทนต์เปลี่ยนวนไปมา
    setInterval(function() {
        if (currentContent === 1) {
            // ซ่อนคอนเทนต์แรก
            content1.classList.remove('visible');
            setTimeout(function() {
                content1.style.display = 'none';

                // แสดงคอนเทนต์ที่สอง
                content2.style.display = 'block';
                content2.classList.add('visible');
            }, 1500); // ตรงกับเวลา transition 1.5 วินาที
            currentContent = 2;
        } else {
            // ซ่อนคอนเทนต์ที่สอง
            content2.classList.remove('visible');
            setTimeout(function() {
                content2.style.display = 'none';

                // แสดงคอนเทนต์แรก
                content1.style.display = 'block';
                content1.classList.add('visible');
            }, 1500); // ตรงกับเวลา transition 1.5 วินาที
            currentContent = 1;
        }
    }, 20000); // เปลี่ยนทุกๆ 20 วินาที
};