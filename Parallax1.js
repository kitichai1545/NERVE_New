window.addEventListener('load', function() {
    const fadeInOnLoadElements = document.querySelectorAll('.hero-section .fade-in-on-load');
    
    fadeInOnLoadElements.forEach(function(element) {
        element.classList.add('visible');
    });
});