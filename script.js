const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-accent');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('text-accent');
        }
    });
});

document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        const code = btn.nextElementSibling.textContent;
        try {
            await navigator.clipboard.writeText(code);
            
            const icon = btn.querySelector('i');
            icon.classList.remove('bi-clipboard');
            icon.classList.add('bi-clipboard-check');
            btn.classList.add('copied');
            
            setTimeout(() => {
                icon.classList.remove('bi-clipboard-check');
                icon.classList.add('bi-clipboard');
                btn.classList.remove('copied');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    });
});

document.getElementById('title').addEventListener('click', (e) => {
    const colors = ['#ff4444', '#ffffff', '#ff8888'];
    
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    const burstCount = 3;
    for (let i = 0; i < burstCount; i++) {
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