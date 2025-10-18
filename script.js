document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const globalNav = document.querySelector('.global-nav');

    if (hamburgerMenu && globalNav) {
        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.toggle('active');
            globalNav.classList.toggle('active');
        });
    }

    // Hero text fade and SNS links visibility on scroll
    const heroCopy = document.querySelector('.hero-copy');
    const snsLinks = document.querySelector('.sns-links');

    if (heroCopy && snsLinks) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const scrollThreshold = 10;

            // Hero text fade
            const opacity = Math.max(0, 1 - scrollY / 300);
            heroCopy.style.opacity = opacity;

            // SNS links visibility
            if (scrollY > scrollThreshold) {
                snsLinks.classList.add('scrolled');
            } else {
                snsLinks.classList.remove('scrolled');
            }
        });
    }

    // Reveal on scroll (IntersectionObserver)
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length > 0 && 'IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        revealEls.forEach(el => io.observe(el));
    } else {
        // Fallback: すぐに表示
        revealEls.forEach(el => el.classList.add('is-visible'));
    }

    // Hover/Tap でテキストを出す（スマホはタップ、PCは従来ホバー＋クリックでも開閉）
    const cards = document.querySelectorAll('.card');
    if (cards.length) {
        cards.forEach(card => {
            // キーボード操作用にフォーカス可能に
            if (!card.hasAttribute('tabindex')) {
                card.setAttribute('tabindex', '0');
            }
            // クリック/タップで開閉
            card.addEventListener('click', () => {
                card.classList.toggle('open');
            });
            // キーボード（Enter/Space）で開閉
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.classList.toggle('open');
                }
            });
        });

        // カード外をクリックしたら閉じる
        document.addEventListener('click', (e) => {
            cards.forEach(card => {
                if (!card.contains(e.target)) {
                    card.classList.remove('open');
                }
            });
        });
    }
});
