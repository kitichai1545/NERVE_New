// กำหนดลิงก์เริ่มต้น
const toggleLink = document.getElementById("toggle-link");

// กำหนดค่าลิงก์ที่จะสลับ
const links = {
  english: "NERVE-ENG.html",
  thai: "NERVE.html"
};


// สถานะเริ่มต้นเป็นภาษาไทย
let currentLink = "thai";

// เพิ่ม event listener
toggleLink.addEventListener("click", function (event) {
  // ป้องกันการเปลี่ยนหน้าอัตโนมัติ
  event.preventDefault();

  // สลับค่าลิงก์
  currentLink = currentLink === "thai" ? "english" : "thai";

  // อัปเดต href ของ <a>
  toggleLink.href = links[currentLink];

  // หากต้องการให้เปลี่ยนหน้าอัตโนมัติ ให้เพิ่ม
  window.location.href = toggleLink.href;
});