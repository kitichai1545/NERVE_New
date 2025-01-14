const express = require('express');
const path = require('path');
const fs = require('fs'); // เพิ่ม: ใช้สำหรับการจัดการไฟล์ JSON
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

// เพิ่ม: กำหนดเส้นทางไฟล์ JSON สำหรับเก็บข้อมูล popupData
const dataFilePath = path.join(__dirname, 'popupData.json');

// เพิ่ม: ฟังก์ชันสำหรับโหลดข้อมูลจากไฟล์ JSON
function loadPopupData() {
    if (fs.existsSync(dataFilePath)) {
        const rawData = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(rawData);
    }
    return []; // คืนค่า array ว่างถ้าไฟล์ยังไม่มีอยู่
}

// เพิ่ม: ฟังก์ชันสำหรับบันทึกข้อมูลลงไฟล์ JSON
function savePopupData(data) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// แก้ไข: โหลดข้อมูล popupData จากไฟล์ JSON แทน array ว่าง
const popupData = loadPopupData();

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

// แก้ไข: เพิ่มการบันทึกข้อมูลลงไฟล์ JSON ใน endpoint /api/save-popup-data
app.post('/api/save-popup-data', (req, res) => {
    const { name, email, url, phone, budget, serve } = req.body;
    const date = new Date().toLocaleDateString();

    console.log("Received Data:", { name, email, url, phone, budget, serve, date });

    // เพิ่มข้อมูลใหม่ใน array
    popupData.push({ name, email, url, phone, budget, serve, date });

    // บันทึกข้อมูลลงไฟล์ JSON
    savePopupData(popupData);

    res.json({ message: 'Data saved successfully!' });
});

// Endpoint สำหรับดึงข้อมูล popup ทั้งหมดใน array
app.get('/api/get-popup-data', (req, res) => {
    res.json(popupData);
});

// กำหนดการจัดเก็บไฟล์ที่อัปโหลด
const upload = multer({ dest: 'uploads/' });

app.post('/upload-background-video', upload.single('video'), (req, res) => {
    res.json({ message: 'Background video uploaded successfully!', file: req.file });
});

app.post('/upload-background-image', upload.single('image'), (req, res) => {
    res.json({ message: 'Background image uploaded successfully!', file: req.file });
});

app.post('/upload-content-video', upload.single('video'), (req, res) => {
    res.json({ message: 'Content video uploaded successfully!', file: req.file });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});