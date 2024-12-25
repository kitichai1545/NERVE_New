window.addEventListener('scroll', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
  
    fadeElements.forEach(element => {
      const position = element.getBoundingClientRect().top;
      const sectionHeight = element.getBoundingClientRect().bottom;
      const screenHeight = window.innerHeight;
  
      // ตรวจสอบว่าคอนเทนต์อยู่ในมุมมองหรือไม่
      if (position < screenHeight && sectionHeight > 0) {
        element.classList.add('visible'); // เพิ่มคลาสเมื่ออยู่ในมุมมอง
      } else {
        element.classList.remove('visible'); // ลบคลาสเมื่อเลื่อนออกจากมุมมอง
      }
    });
  });