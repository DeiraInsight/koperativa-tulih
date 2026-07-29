document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Memuat Header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            
            // === LOGIKA MENU AKTIF ===
            let currentPath = window.location.pathname.split('/').pop() || 'index.html';
            // Jika currentPath kosong (root), set ke index.html
            if (currentPath === '' || currentPath === '/') {
                currentPath = 'index.html';
            }
            
            let navLinks = document.querySelectorAll('#main-nav a');
            navLinks.forEach(link => {
                link.classList.remove('active'); // <-- AKTIFKAN baris ini
                if (link.getAttribute('href') === currentPath) {
                    link.classList.add('active');
                }
            });
        });

    // 2. Memuat Footer + tahun otomatis
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
            let year = document.getElementById('footer-year');
            if (year) {
                year.textContent = new Date().getFullYear();
            }
        });

});
