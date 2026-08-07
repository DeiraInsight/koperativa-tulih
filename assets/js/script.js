document.addEventListener("DOMContentLoaded", function() {
    
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            let currentPath = window.location.pathname.split('/').pop() || 'index.html';
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

            const hamburger = document.getElementById('hamburger');
            const mainNav = document.getElementById('main-nav');

            if (hamburger && mainNav) {
                hamburger.addEventListener('click', function() {
                    mainNav.classList.toggle('nav-active');
                    hamburger.classList.toggle('toggle');
                });
            }
        })
        .catch(error => console.error('Gagal memuat header:', error));

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

    const track = document.getElementById('testimonialTrack');
    const dotsContainer = document.getElementById('testiDots');
    
    if (track && dotsContainer) { 
        const cards = Array.from(track.children);
        let currentIndex = 0;
        const slideInterval = 10000; 

        cards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active'); 
            
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(dotsContainer.children);

        function goToSlide(index) {
            currentIndex = index;
            const offset = -currentIndex * 100; 
            track.style.transform = `translateX(${offset}%)`;
            
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentIndex].classList.add('active');
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % cards.length;
            goToSlide(currentIndex);
        }

        setInterval(nextSlide, slideInterval);
    }
});
