function uploadBackgroundVideo() {
    const token = localStorage.getItem('authToken');
    const videoFileInput = document.getElementById('background-video');
    const videoFile = videoFileInput ? videoFileInput.files[0] : null;

    if (videoFile && token) {
        const formData = new FormData();
        formData.append('video', videoFile);

        fetch('http://localhost:3000/upload-background-video', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) alert(data.message);
                else console.error("Unexpected response:", data);
            })
            .catch(error => {
                console.error("Error uploading video:", error);
                alert("เกิดข้อผิดพลาดในการอัปโหลดวิดีโอ");
            });
    } else {
        alert("กรุณาเลือกไฟล์วิดีโอและตรวจสอบว่าได้เข้าสู่ระบบแล้ว");
    }
}

function uploadBackgroundImage() {
    const token = localStorage.getItem('authToken');
    const imageFileInput = document.getElementById('background-image');
    const imageFile = imageFileInput ? imageFileInput.files[0] : null;

    if (imageFile && token) {
        const formData = new FormData();
        formData.append('image', imageFile);

        fetch('http://localhost:3000/upload-background-image', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) alert(data.message);
                else console.error("Unexpected response:", data);
            })
            .catch(error => {
                console.error("Error uploading image:", error);
                alert("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ");
            });
    } else {
        alert("กรุณาเลือกไฟล์รูปภาพและตรวจสอบว่าได้เข้าสู่ระบบแล้ว");
    }
}










function saveContent() {
    const token = localStorage.getItem('authToken');
    const content = document.getElementById('content-editor').value;

    if (content && token) {
        fetch('http://localhost:3000/save-content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ content })
        })
            .then(response => response.json())
            .then(data => alert(data.message))
            .catch(error => console.error("Error saving content:", error));
    }
}

function loadContent() {
    const token = localStorage.getItem('authToken');
    fetch('http://localhost:3000/get-content', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('content-editor').value = data.content;
        })
        .catch(error => console.error("Error loading content:", error));
}










function loadPopupData() {
    fetch('http://localhost:3000/api/get-popup-data')
        .then(response => response.json())
        .then(data => {
            console.log('Received data:', data); // ดูข้อมูลที่ได้จาก API
            const tableBody = document.querySelector('.popup-data-table tbody');
            tableBody.innerHTML = ''; // ล้างข้อมูลเก่า

            data.forEach(entry => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${entry.name || 'N/A'}</td>
                    <td>${entry.email || 'N/A'}</td>
                    <td>${entry.url || 'N/A'}</td>
                    <td>${entry.phone || 'N/A'}</td>
                    <td>${entry.budget || 'N/A'}</td>
                    <td>${entry.serve || 'N/A'}</td>
                    <td>${entry.date || 'N/A'}</td> <!-- แสดงวันที่ -->
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error loading popup data:', error);
            alert('ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง');
        });
}

function submitPopupForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const url = document.getElementById('url').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const budget = document.getElementById('Budget').value;
    const services = Array.from(document.querySelectorAll('input[name="service"]:checked'))
        .map(checkbox => checkbox.value);

    if (!name || !email || !url || !phone || !budget || services.length === 0) {
        alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
        return;
    }

    fetch('http://localhost:3000/api/save-popup-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name,
            email,
            url,
            phone,
            budget,
            serve: services.join(', ')
        })
    })
        .then(response => response.json())
        .then(data => {
            alert("บันทึกข้อมูลเรียบร้อย");
            loadPopupData(); // โหลดข้อมูลใหม่
        })
        .catch(error => {
            console.error('Error submitting popup data:', error);
            alert("เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง");
        });
}

function formatDate(dateString) {
    if (!dateString) return 'N/A'; // หากไม่มีก็แสดง 'N/A'
    console.log('Formatted date:', new Date(dateString)); // เช็คการแปลงวันที่
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}












function showDefaultSection() {
    document.querySelectorAll('.content-section, .content-section2, .content-section3').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('nerve-section').style.display = 'block';
}

document.addEventListener("DOMContentLoaded", function () {
    loadContent();
    showDefaultSection();
    loadPopupData();
});

document.getElementById("logo").addEventListener("click", () => {
    showDefaultSection();
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
});

document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function (event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.querySelectorAll('.content-section, .content-section2, .content-section3').forEach(section => {
            section.style.display = 'none';
        });
        document.getElementById(targetId).style.display = 'block';
        document.querySelectorAll('.menu-item').forEach(menu => menu.classList.remove('active'));
        this.classList.add('active');
    });
});








// ฟังก์ชันแสดงตัวอย่างวิดีโอ
function previewVideo(section) {
    // อ้างอิงองค์ประกอบของ video input และ preview โดยใช้ section name
    const videoInput1 = document.getElementById(`${section}-background-video`);
    const videoInput2 = document.getElementById(`${section}-background-video1`);
    const videoPreview1 = document.getElementById(`${section}-video-preview`);
    const videoPreview2 = document.getElementById(`${section}-video-preview1`);

    if (videoInput1 && videoInput1.files && videoInput1.files[0]) {
        const fileURL = URL.createObjectURL(videoInput1.files[0]);
        videoPreview1.src = fileURL;
        videoPreview1.style.display = 'block';
    } else {
        videoPreview1.style.display = 'none';
    }

    if (videoInput2 && videoInput2.files && videoInput2.files[0]) {
        const fileURL = URL.createObjectURL(videoInput2.files[0]);
        videoPreview2.src = fileURL;
        videoPreview2.style.display = 'block';
    } else {
        videoPreview2.style.display = 'none';
    }
}

// ฟังก์ชันแสดงตัวอย่างรูปภาพ
function previewImage(section) {
    const imageInput1 = document.getElementById(`${section}-background-image`);
    const imageInput2 = document.getElementById(`${section}-background-image1`);
    const imagePreview1 = document.getElementById(`${section}-image-preview`);
    const imagePreview2 = document.getElementById(`${section}-image-preview1`);

    if (imageInput1 && imageInput1.files && imageInput1.files[0]) {
        const fileURL = URL.createObjectURL(imageInput1.files[0]);
        imagePreview1.src = fileURL;
        imagePreview1.style.display = 'block';
    } else {
        imagePreview1.style.display = 'none';
    }

    if (imageInput2 && imageInput2.files && imageInput2.files[0]) {
        const fileURL = URL.createObjectURL(imageInput2.files[0]);
        imagePreview2.src = fileURL;
        imagePreview2.style.display = 'block';
    } else {
        imagePreview2.style.display = 'none';
    }
}











function addBlogToSection1() {
    const blogListSection = document.getElementById("blog-list1");
    const blogCount = blogListSection.children.length + 1; // นับจำนวน Blog ที่มีอยู่
    const blogId = `blog-section1-${blogCount}`; // ใช้สำหรับ ID ไม่ต้องแสดงบน UI

    const blogItem = document.createElement("div");
    blogItem.classList.add("blog-item");
    blogItem.id = blogId;

    blogItem.innerHTML = `
        <h3>Blog Section ${blogCount}</h3> <!-- เปลี่ยนหัวข้อเป็นตัวเลขเท่านั้น -->
        <label>Blog Name (for Admin use):</label>
        <input type="text" id="${blogId}-label" placeholder="Enter blog name here for admin use">

        <label>Blog Image:</label>
        <input type="file" id="${blogId}-background-image" accept="image/*" onchange="previewImage('${blogId}')">
        <img id="${blogId}-image-preview" style="display: none; width: 100%; max-width: 500px; margin-top: 10px;" alt="Image Preview">

        <label>Blog Title:</label>
        <input type="text" id="${blogId}-title" placeholder="Enter blog title here...">

        <label>Content:</label>
        <textarea id="${blogId}-content" rows="5" cols="50" placeholder="Edit content here..."></textarea>

        <button onclick="saveBlog('${blogId}')">Save</button>
        <button onclick="deleteBlog('${blogId}')">Delete</button>
    `;

    blogListSection.appendChild(blogItem);
}

document.getElementById("add-new-blog1").onclick = function () {
    addBlogToSection1(); // เรียกฟังก์ชันเมื่อกดปุ่มเพิ่ม Blog
};



function addBlogToSection2() {
    const blogListSection = document.getElementById("blog-list");
    const blogCount = blogListSection.children.length + 1; // นับจำนวน Blog ที่มีอยู่
    const blogId = `blog-section2-${blogCount}`; // ใช้สำหรับ ID

    const blogItem = document.createElement("div");
    blogItem.classList.add("blog-item");
    blogItem.id = blogId;

    blogItem.innerHTML = `
        <h3>Blog Section ${blogCount}</h3> <!-- เปลี่ยนหัวข้อเป็นตัวเลขต่อเนื่อง -->
        <label>Blog Name (for Admin use):</label>
        <input type="text" id="${blogId}-label" placeholder="Enter blog name here for admin use">

        <label>Blog Image:</label>
        <input type="file" id="${blogId}-background-image" accept="image/*" onchange="previewImage('${blogId}')">
        <img id="${blogId}-image-preview" style="display: none; width: 100%; max-width: 500px; margin-top: 10px;" alt="Image Preview">

        <label>Blog Title:</label>
        <input type="text" id="${blogId}-title" placeholder="Enter blog title here...">

        <label>Content:</label>
        <textarea id="${blogId}-content" rows="5" cols="50" placeholder="Edit content here..."></textarea>

        <button onclick="saveBlog('${blogId}')">Save</button>
        <button onclick="deleteBlog('${blogId}')">Delete</button>
    `;

    blogListSection.appendChild(blogItem);
}

document.getElementById("add-new-blog").onclick = function () {
    addBlogToSection2(); // เรียกฟังก์ชันเมื่อกดปุ่มเพิ่ม Blog
};

// ใน backoffice.js
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
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
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
