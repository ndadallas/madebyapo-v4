// MADEBYAPO v4 — vidéos des vignettes : boucle muette, seulement quand elles sont visibles.
// Accueil (data-hover-play) : la vidéo ne se lance pas toute seule, elle joue au survol.
(() => {
    const videos = document.querySelectorAll('.tile video');
    if (!videos.length) return;

    const io = new IntersectionObserver((entries) => {
        entries.forEach(({ target, isIntersecting }) => {
            if (isIntersecting) target.play().catch(() => {});
            else target.pause();
        });
    }, { threshold: 0.15 });

    videos.forEach((v) => {
        if (!v.hasAttribute('data-hover-play')) { io.observe(v); return; }
        const tile = v.closest('.tile');
        tile.addEventListener('pointerenter', () => v.play().catch(() => {}));
        tile.addEventListener('pointerleave', () => v.pause());
        tile.addEventListener('focus', () => v.play().catch(() => {}));
        tile.addEventListener('blur', () => v.pause());
    });
})();
