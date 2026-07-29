// === PINTU GERBANG UTAMA (Hanya butuh satu kali) ===
document.addEventListener("DOMContentLoaded", function() {
    
    /* ==========================================
       1. MEMUAT HEADER & LOGIKA MENU AKTIF
       ========================================== */
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            
            // Logika Menu Aktif
            let currentPath = window.location.pathname.split('/').pop() || 'index.html';
            
            // Jika currentPath kosong (root), set ke index.html
            if (currentPath === '' || currentPath === '/') {
                currentPath = 'index.html';
            }
            
            let navLinks = document.querySelectorAll('#main-nav a');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === currentPath) {
                    link.classList.add('active');
                }
            });
        })
        .catch(error => console.error('Gagal memuat header:', error));

    /* ==========================================
       2. MEMUAT FOOTER & TAHUN OTOMATIS
       ========================================== */
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
            
            let year = document.getElementById('footer-year');
            if (year) {
                year.textContent = new Date().getFullYear();
            }
        })
        .catch(error => console.error('Gagal memuat footer:', error));

    /* ==========================================
       3. SLIDER TESTIMONI (KHUSUS HALAMAN ATENDIMENTU)
       ========================================== */
    const track = document.getElementById('testimonialTrack');
    const dotsContainer = document.getElementById('testiDots');
    
    // Jika elemen ditemukan (berarti sedang di halaman atendimentu), jalankan script slider
    if (track && dotsContainer) { 
        const cards = Array.from(track.children);
        let currentIndex = 0;
        const slideInterval = 10000; // 10.000 milidetik = 10 Detik

        // Membuat titik (dots) secara otomatis berdasarkan jumlah testimoni
        cards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active'); // Titik pertama aktif
            
            // Klik dot untuk berpindah
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(dotsContainer.children);

        // Fungsi utama menggeser slider
        function goToSlide(index) {
            currentIndex = index;
            const offset = -currentIndex * 100; // Menggeser -100%, -200%, dst
            track.style.transform = `translateX(${offset}%)`;
            
            // Perbarui warna titik (dots)
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentIndex].classList.add('active');
        }

        // Fungsi untuk pindah ke slide berikutnya
        function nextSlide() {
            currentIndex = (currentIndex + 1) % cards.length;
            goToSlide(currentIndex);
        }

        // Menjalankan fungsi geser otomatis setiap 10 detik
        setInterval(nextSlide, slideInterval);
    }
});
