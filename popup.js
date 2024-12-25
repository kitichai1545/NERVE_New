// เปิด Popup เมื่อคลิกที่ปุ่มใน hero (index1)
const btnHero = document.getElementById("openPopupBtn") || document.getElementById("openPopupBtn2");
if (btnHero) {
    btnHero.addEventListener("click", (event) => {
        event.preventDefault(); // ป้องกันการรีเฟรชหน้า
        document.getElementById("popupForm").style.display = "flex"; // แสดง popup แบบกึ่งกลาง
    });
}

// เปิด Popup เมื่อคลิกที่ปุ่มใน footer
const btnFooter = document.getElementById("openPopupBtnFooter");
if (btnFooter) {
    btnFooter.addEventListener("click", (event) => {
        event.preventDefault(); // ป้องกันการรีเฟรชหน้า
        document.getElementById("popupForm").style.display = "flex"; // แสดง popup แบบกึ่งกลาง
    });
}

// ปิด Popup เมื่อคลิกที่ปุ่มปิด
const closeBtn = document.getElementById("closePopupBtn2");
if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        document.getElementById("popupForm").style.display = "none"; // ซ่อน popup
        document.getElementById("successMessage").style.display = "none"; // ซ่อนข้อความสำเร็จ
        document.getElementById("submitPopupBtn").style.display = "block"; // แสดงปุ่มส่งอีกครั้ง
        document.querySelector('form').reset(); // ล้างข้อมูลฟอร์ม
    });
}

// ฟังก์ชันสำหรับส่งข้อมูลจาก popup ไปยัง API
async function submitPopupForm() {
    // รับค่าจากฟอร์มใน popup
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const url = document.getElementById('url').value;
    const phone = document.getElementById('phone').value;
    const budget = document.getElementById('Budget').value;
    const services = Array.from(document.querySelectorAll('input[name="service"]:checked'))
                        .map(checkbox => checkbox.value);

    // ตรวจสอบว่าฟิลด์ทั้งหมดถูกกรอกครบถ้วน
    if (!name || !email || !url || !phone || !budget || services.length === 0) {
        alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
        return;
    }

    try {
        // ส่งข้อมูลไปยัง API ของ Backend
        const response = await fetch('http://localhost:3000/api/save-popup-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                url,
                phone,
                budget,
                serve: services.join(', '),
            }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Success:', data);

            // แสดงข้อความสำเร็จ
            const successMessage = document.getElementById("successMessage");
            successMessage.style.display = "block"; // แสดงข้อความสำเร็จ
            document.getElementById("submitPopupBtn").style.display = "none"; // ซ่อนปุ่มส่ง
        } else {
            alert("เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง");
        }
    } catch (error) {
        console.error('Error:', error);
        alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง");
    }
}

// เชื่อมโยงฟังก์ชันส่งข้อมูลกับปุ่มส่งข้อมูลใน popup
const submitBtn = document.getElementById("submitPopupBtn");
if (submitBtn) {
    submitBtn.addEventListener("click", (event) => {
        event.preventDefault(); // ป้องกันการรีเฟรชหน้า
        submitPopupForm(); // เรียกฟังก์ชันส่งข้อมูล
    });
}