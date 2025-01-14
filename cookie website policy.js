document.getElementById('accept-cookies').addEventListener('click', function () {
    // ตั้งค่าคุกกี้
    document.cookie = "cookiesAccepted=true; path=/; max-age=" + (60 * 60 * 24 * 30); // บันทึก 30 วัน
    // ซ่อนแบนเนอร์
    document.getElementById('cookie-banner').style.display = 'none';
  });

  // ฟังก์ชันตรวจสอบคุกกี้
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// ตรวจสอบว่าคุกกี้ "cookiesAccepted" มีค่าเป็น "true" หรือไม่
if (getCookie('cookiesAccepted') !== 'true') {
    document.getElementById('cookie-banner').style.display = 'flex';
} else {
    document.getElementById('cookie-banner').style.display = 'none';
}

// การตั้งค่าคุกกี้เมื่อกด "ยอมรับ"
document.getElementById('accept-cookies').addEventListener('click', function () {
    document.cookie = "cookiesAccepted=true; path=/; max-age=" + (60 * 60 * 24 * 30); // 30 วัน
    document.getElementById('cookie-banner').style.display = 'none';
});