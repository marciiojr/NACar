const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.05 }); // Apenas 5% de visibilidade

document.querySelectorAll('.fade-in, .fade-right , .fade-left, .fade-up, .scale-in, .slide-in-right').forEach(el => observer.observe(el));
