document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    const title = document.getElementById('title');
    const copyButtons = document.querySelectorAll('.copy-btn');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('text-accent', link.getAttribute('href').slice(1) === current);
        });
    });

    copyButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const code = btn.nextElementSibling.textContent;
            try {
                await navigator.clipboard.writeText(code);

                const icon = btn.querySelector('i');
                icon.classList.replace('bi-clipboard', 'bi-clipboard-check');
                btn.classList.add('copied');

                setTimeout(() => {
                    icon.classList.replace('bi-clipboard-check', 'bi-clipboard');
                    btn.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text:', err);
            }
        });
    });

    title.addEventListener('click', (e) => {
        const colors = ['#ff4444', '#ffffff', '#ff8888'];
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                confetti({
                    particleCount: 50,
                    spread: 80,
                    origin: { x, y },
                    colors: colors,
                    startVelocity: 45 + Math.random() * 10,
                    gravity: 1,
                    ticks: 200,
                    shapes: ['square', 'circle'],
                    scalar: 0.75,
                    zIndex: 100,
                    angle: -45,
                    drift: 3 + Math.random() * 2,
                    disableForReducedMotion: true
                });
            }, i * 40);
        }
    });
});