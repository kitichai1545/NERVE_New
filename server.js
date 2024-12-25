const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const multer = require('multer');

app.use(express.json());
// ใช้ CORS ให้รองรับทั้ง localhost และ production
app.use(cors({
    origin: '*', // เพื่ออนุญาตทุกโดเมน
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.static(path.join(__dirname)));

// Route สำหรับส่งไฟล์ HTML
app.get('/Login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'Login.html'));
});

app.get('/index1', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/backoffice.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'backoffice.html'));
});

// Endpoint สำหรับการ Login
const VALID_USERNAME = 'admin';
const VALID_PASSWORD = 'password';

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        const token = 'sample-jwt-token'; // จำลอง token
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// สร้าง array เก็บข้อมูล popup
const popupData = [];

app.post('/api/save-popup-data', (req, res) => {
    const { name, email, url, phone, budget, serve } = req.body;
    const date = new Date().toLocaleDateString(); // เก็บวันที่
    console.log("Received Data:", { name, email, url, phone, budget, serve, date }); // แสดงข้อมูลที่รับมา

    // ส่งข้อมูลพร้อมวันที่ไปยัง popupData
    popupData.push({ name, email, url, phone, budget, serve, date });

    res.json({ message: 'Data saved successfully!' });
});


// Endpoint สำหรับดึงข้อมูล popup ทั้งหมดใน array
app.get('/api/get-popup-data', (req, res) => {
    res.json(popupData);
});

// กำหนดการจัดเก็บไฟล์ที่อัปโหลด
const upload = multer({ dest: 'uploads/' });

// Endpoint สำหรับอัปโหลดวิดีโอพื้นหลัง
app.post('/upload-background-video', upload.single('video'), (req, res) => {
    res.json({ message: 'Background video uploaded successfully!', file: req.file });
});

// Endpoint สำหรับอัปโหลดภาพพื้นหลัง
app.post('/upload-background-image', upload.single('image'), (req, res) => {
    res.json({ message: 'Background image uploaded successfully!', file: req.file });
});

// Endpoint สำหรับอัปโหลดเนื้อหาวิดีโอ
app.post('/upload-content-video', upload.single('video'), (req, res) => {
    res.json({ message: 'Content video uploaded successfully!', file: req.file });
});

// Endpoint สำหรับดึงเนื้อหาที่มีอยู่ (ตัวอย่าง)
app.get('/get-content', (req, res) => {
    const existingContent = "นี่คือเนื้อหาที่มีอยู่ที่ต้องการแก้ไข";
    res.json({ content: existingContent });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});