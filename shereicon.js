function toggleShareIcons(event) {
    event.preventDefault(); // ป้องกันไม่ให้ลิงก์หลักทำงาน
    const shareIcons = document.querySelector('.share-icons-hidden');
    shareIcons.style.display = shareIcons.style.display === 'none' || shareIcons.style.display === '' ? 'flex' : 'none';
}