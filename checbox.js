document.querySelectorAll('.custom-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const label = this.nextElementSibling;
        const img = label.querySelector('.checkbox-icon');
        if (this.checked) {
            img.src = 'Checked.png'; // ไอคอนที่แสดงเมื่อถูกเลือก
        } else {
            img.src = 'Checkbox.png'; // ไอคอนเดิมเมื่อไม่ถูกเลือก
        }
    });
});