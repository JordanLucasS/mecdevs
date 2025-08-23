document.addEventListener('DOMContentLoaded', () => {

    // --- FUNÇÃO DE ANIMAÇÃO NO SCROLL (AOS) ---
    const initAOS = () => {
        const aosElements = document.querySelectorAll('[data-aos]');
        if (aosElements.length > 0) {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('aos-animate');
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            aosElements.forEach(el => observer.observe(el));
        }
    };

    // --- BARRA DE PROGRESSO DE LEITURA ---
    const initProgressBar = () => {
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            window.addEventListener('scroll', () => {
                const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
                if (scrollHeight > clientHeight) {
                    const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100 + '%';
                    progressBar.style.width = scrollPercent;
                }
            }, { passive: true });
        }
    };

    // --- MENU HAMBÚRGUER ---
    const initMobileMenu = () => {
        const hamburger = document.querySelector('.hamburger');
        const nav = document.querySelector('.nav');
        if (hamburger && nav) {
            hamburger.addEventListener('click', (e) => {
                e.stopPropagation();
                nav.classList.toggle('active');
            });
            document.addEventListener('click', (e) => {
                if (nav.classList.contains('active') && !nav.contains(e.target)) {
                    nav.classList.remove('active');
                }
            });
        }
    };
    
    // --- CARROSSEL DE BENEFÍCIOS ---
    const initBenefitsCarousel = () => {
        const wrapper = document.querySelector('.benefits-carousel-wrapper');
        if (wrapper) {
            const scroller = wrapper.querySelector('.benefits-scroller');
            const prevBtn = wrapper.querySelector('.benefits-nav.prev');
            const nextBtn = wrapper.querySelector('.benefits-nav.next');
            if (scroller && prevBtn && nextBtn) {
                const updateNavButtons = () => {
                    prevBtn.disabled = scroller.scrollLeft < 10;
                    nextBtn.disabled = scroller.scrollWidth - scroller.scrollLeft - scroller.clientWidth < 10;
                }
                const scrollAmount = () => {
                    if (scroller.firstElementChild) {
                        return scroller.firstElementChild.offsetWidth * 1.1;
                    }
                    return scroller.clientWidth * 0.8;
                };

                prevBtn.addEventListener('click', () => scroller.scrollLeft -= scrollAmount());
                nextBtn.addEventListener('click', () => scroller.scrollLeft += scrollAmount());
                scroller.addEventListener('scroll', updateNavButtons, { passive: true });
                window.addEventListener('resize', updateNavButtons, { passive: true });
                updateNavButtons();
            }
        }
    };

    // --- ANIMAÇÃO DO BOTÃO DO QUIZ ---
    const initQuizButtonAnimation = () => {
        const quizButton = document.querySelector('.quiz-cta');
        if (quizButton) {
            quizButton.addEventListener('mousemove', (e) => {
                const rect = quizButton.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width * 100;
                const y = (e.clientY - rect.top) / rect.height * 100;
                quizButton.style.setProperty('--x', x);
                quizButton.style.setProperty('--y', y);
            });
        }
    };

    // --- PORTFOLIO COVER FLOW CAROUSEL ---
    const initPortfolioCarousel = () => {
        const carousel = document.querySelector('.portfolio-carousel');
        if (!carousel) return;
        
        const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
        const nextButton = carousel.querySelector('.portfolio-nav.next');
        const prevButton = carousel.querySelector('.portfolio-nav.prev');

        if (slides.length === 0) return;

        let currentIndex = Math.floor(slides.length / 2);
        
        const updateCarousel = () => {
            slides.forEach((slide, i) => {
                const classList = slide.classList;
                classList.remove('active', 'prev', 'next', 'far-prev', 'far-next', 'hidden');
                
                let diff = i - currentIndex;
                
                if (diff === 0) classList.add('active');
                else if (diff === -1) classList.add('prev');
                else if (diff === 1) classList.add('next');
                else if (diff === -2) classList.add('far-prev');
                else if (diff === 2) classList.add('far-next');
                else classList.add('hidden');
            });
        }
        
        const move = (direction) => {
            const newIndex = currentIndex + direction;
            if (newIndex >= 0 && newIndex < slides.length) {
                currentIndex = newIndex;
                updateCarousel();
            }
        };

        nextButton.addEventListener('click', () => move(1));
        prevButton.addEventListener('click', () => move(-1));
        
        const track = carousel.querySelector('.carousel-track-container');
        let touchStartX = 0;
        track.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
        track.addEventListener('touchend', e => {
            const touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 50) move(1);
            if (touchEndX > touchStartX + 50) move(-1);
        });

        updateCarousel();
    };
    
    // --- INICIALIZAR TODOS OS MÓDULOS ---
    initAOS();
    initProgressBar();
    initMobileMenu();
    initBenefitsCarousel();
    initQuizButtonAnimation();
    initPortfolioCarousel();

});