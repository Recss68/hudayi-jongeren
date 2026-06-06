<script>
    import { onMount } from 'svelte';
    import { resolve } from '$app/paths';
    import DummyArticles from '$lib/data/dummy-articles.json';

    const articles = Array.isArray(DummyArticles) ? DummyArticles : [];

    let activeIndex = $state(0);
    let trackEl = $state();

    onMount(() => {
        if (!trackEl) return;
        const cards = trackEl.querySelectorAll('.article-card');
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        activeIndex = [...cards].indexOf(entry.target);
                    }
                }
            },
            { root: trackEl, threshold: 0.6 }
        );
        for (const card of cards) observer.observe(card);
        return () => observer.disconnect();
    });
</script>

<section class="section blog-section">
    <div class="section-inner">
        <div class="section-header">
            <h2>Bizden Haberler</h2>
            <a href={resolve('/haberler')} class="header-link">Tüm haberleri gör</a>
        </div>

        <div class="articles-wrapper">
            <ul class="article-track" bind:this={trackEl}>
                {#each articles as article (article.id)}
                    <li class="article-card">
                        <img src={article.afbeelding} alt={article.titel} class="card-image" />
                        <div class="card-content">
                            <span class="card-category">{article.categorie}</span>
                            <h3 class="card-title">{article.titel}</h3>
                            <p class="card-excerpt">{article.excerpt}</p>
                            <a href={resolve(`/haberler/${article.slug}`)} class="card-link">Meer lezen →</a>
                        </div>
                    </li>
                {/each}
            </ul>

            <div class="slider-nav">
                <ol class="dot-list">
                    {#each articles as article, i (article.id)}
                        <li><span class="dot" class:dot--active={i === activeIndex}></span></li>
                    {/each}
                </ol>
            </div>
        </div>
    </div>
</section>
