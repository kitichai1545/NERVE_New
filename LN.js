// ฟังก์ชันสำหรับเข้าสู่ระบบ
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // เรียก API สำหรับเข้าสู่ระบบ
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }) // ส่งข้อมูล username และ password
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // บันทึก Token ใน LocalStorage
            localStorage.setItem('authToken', data.token);

            // นำทางไปยังหน้า Dashboard (backoffice.html)
            window.location.href = 'backoffice.html';
        } else {
            // แสดงข้อความเมื่อเข้าสู่ระบบไม่สำเร็จ
            document.getElementById("message").innerText = "Invalid credentials. Please try again.";
        }
    })
    .catch(error => {
        console.error("Error during login:", error);
        document.getElementById("message").innerText = "An error occurred. Please try again.";
    });
}