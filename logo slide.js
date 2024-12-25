document.addEventListener("DOMContentLoaded", function () {
  const logoContainer1 = document.getElementById('logo-container-1');
  const logoContainer2 = document.getElementById('logo-container-2');

  // เริ่มต้นให้โลโก้ชุดที่ 1 แสดง
  logoContainer1.classList.add('active');

  const observerOptions = {
    root: null,
    threshold: 0.1 // ทำงานเมื่อโลโก้ 10% เข้ามาใน viewport
  };

  // สร้าง observer สำหรับ logoContainer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // เมื่อโลโก้ชุดที่ 1 เข้ามาใน viewport
        if (!logoContainer1.classList.contains('exit')) {
          logoContainer1.classList.add('active'); // เลื่อนเข้า
        }
      } else {
        // เมื่อเลื่อนออก
        logoContainer1.classList.remove('active'); // รีเซ็ตคลาส active
        logoContainer1.classList.remove('exit'); // รีเซ็ตคลาส exit
      }
    });
  }, observerOptions);

  // เริ่มต้นการสังเกต
  observer.observe(logoContainer1);

  setInterval(() => {
    if (logoContainer1.classList.contains('active')) {
      // ถ้าโลโก้ชุดที่ 1 กำลังแสดง
      logoContainer1.classList.add('exit'); // ให้โลโก้ชุดที่ 1 เลื่อนออก
      setTimeout(() => {
        logoContainer1.classList.remove('active'); // ซ่อนโลโก้ชุดที่ 1
        logoContainer2.classList.add('active'); // ให้โลโก้ชุดที่ 2 เลื่อนเข้า
        logoContainer2.classList.remove('exit'); // รีเซ็ตคลาส exit
      }, 1500); // เวลาที่ใช้สำหรับเลื่อนออก
    } else {
      // ถ้าโลโก้ชุดที่ 2 กำลังแสดง
      logoContainer2.classList.add('exit'); // ให้โลโก้ชุดที่ 2 เลื่อนออก
      setTimeout(() => {
        logoContainer2.classList.remove('active'); // ซ่อนโลโก้ชุดที่ 2
        logoContainer1.classList.add('active'); // ให้โลโก้ชุดที่ 1 เลื่อนเข้า
        logoContainer1.classList.remove('exit'); // รีเซ็ตคลาส exit
      }, 1500); // เวลาที่ใช้สำหรับเลื่อนออก
    }
  }, 20000); // ตั้งให้สลับทุก 20 วินาที
});