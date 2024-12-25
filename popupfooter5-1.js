document.getElementById("openPopupBtnFooter").addEventListener("click", function(event) {
    event.preventDefault();
    console.log("เปิด popup");
    document.getElementById("popupForm").style.display = "flex";  // แสดง popup
});

document.getElementById("closePopupBtn2").addEventListener("click", function(event) {
    event.preventDefault();
    console.log("ปิด popup");
    document.getElementById("popupForm").style.display = "none";  // ซ่อน popup
});