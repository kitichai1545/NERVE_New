function setVideoSource(videoId, desktopSrc, mobileSrc) {
    const videoElement = document.getElementById(videoId);

    // ตรวจสอบว่า videoElement ถูกพบหรือไม่
    if (!videoElement) {
        console.error(`Video element with ID ${videoId} not found.`);
        return;
    }

    // ตรวจสอบขนาดหน้าจอและตั้งค่าแหล่งวิดีโอเฉพาะเมื่อจำเป็น
    if (window.innerWidth <= 768) {
        if (videoElement.src !== mobileSrc) {  // เปลี่ยนเฉพาะเมื่อแหล่งวิดีโอต่างจากปัจจุบัน
            videoElement.src = mobileSrc;
            console.log(`Setting mobile video for ${videoId}`);
            videoElement.load();
            videoElement.play();
        }
    } else {
        if (videoElement.src !== desktopSrc) {  // เปลี่ยนเฉพาะเมื่อแหล่งวิดีโอต่างจากปัจจุบัน
            videoElement.src = desktopSrc;
            console.log(`Setting desktop video for ${videoId}`);
            videoElement.load();
            videoElement.play();
        }
    }
}

// เรียกฟังก์ชันเพื่อตั้งค่าแหล่งที่มาของวิดีโอเมื่อโหลดหน้าเสร็จ
window.addEventListener("load", function () {
    setVideoSource("video2", "S1_COM1.mp4", "S1_Mobile1.mp4");
    setVideoSource("video3", "S2_COM.mp4", "S2_Mobile.mp4");
    setVideoSource("video4", "S3_COM.mp4", "S3_Mobile.mp4");
    setVideoSource("video02", "S1_COM2.mp4", "S1_Mobile2.mp4");
    setVideoSource("video03", "S2_COM.mp4", "S2_Mobile.mp4");
    setVideoSource("video04", "S3_COM.mp4", "S3_Mobile.mp4"); 
});

// เอา resize event ออกชั่วคราวเพื่อดูว่าปัญหามาจากการ resize หรือไม่