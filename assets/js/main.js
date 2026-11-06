// MADEBYAPO v4 — vidéos des vignettes : image fixe, la vidéo joue au survol (avec le zoom de la vignette).
// Écrans tactiles (pas de survol) : lecture quand la vignette est visible, sinon rien ne bougerait jamais.
// Pages projet : image du projet d'abord, le lecteur Vimeo (avec le son) ne se charge qu'au clic.
document.querySelectorAll('.player-poster').forEach((btn) => btn.addEventListener('click', () => {
    const f = document.createElement('iframe');
    f.src = `https://player.vimeo.com/video/${btn.dataset.vimeo}?autoplay=1&dnt=1&title=0&byline=0&portrait=0&color=F56875`;
    f.title = btn.getAttribute('aria-label');
    f.allow = 'autoplay; fullscreen; picture-in-picture';
    f.allowFullscreen = true;
    btn.replaceWith(f);
}, { once: true }));

(() => {
    const videos = document.querySelectorAll('.tile video');
    if (!videos.length) return;

    if (matchMedia('(hover: none)').matches) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(({ target, isIntersecting }) => {
                if (isIntersecting) target.play().catch(() => {});
                else target.pause();
            });
        }, { threshold: 0.15 });
        videos.forEach((v) => io.observe(v));
        return;
    }

    videos.forEach((v) => {
        const tile = v.closest('.tile');
        const play = () => v.play().catch(() => {});
        const stop = () => v.pause();
        tile.addEventListener('pointerenter', play);
        tile.addEventListener('pointerleave', stop);
        tile.addEventListener('focus', play);
        tile.addEventListener('blur', stop);
    });
})();
