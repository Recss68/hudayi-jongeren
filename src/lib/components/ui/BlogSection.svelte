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

<style>
    .blog-section {
        background-color: var(--c-creme);
        color: var(--c-nachtgroen);
    }

    .section-inner {
        padding-block: 3rem;
    }

    .section-header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        padding-inline: 1.25rem;
        margin-block-end: 1.5rem;

        h2 {
            margin: 0;
            font-size: clamp(1.6rem, 6vw, 2rem);
            font-weight: 700;
            letter-spacing: -0.04em;
        }
    }

    .header-link {
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--c-nachtgroen);
        text-decoration: underline;
        text-underline-offset: 0.2em;
        white-space: nowrap;
    }

    /* mobile: horizontal scroll-snap slider */
    .articles-wrapper {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
    }

    .article-track {
        display: flex;
        gap: 1rem;
        padding-inline: 1.25rem;
        margin: 0;
        list-style: none;
        overflow-x: scroll;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;

        &::-webkit-scrollbar { display: none; }
    }

    .article-card {
        flex: 0 0 calc(100% - 2.5rem);
        scroll-snap-align: start;
        background-color: #fff;
        border-radius: 0.75rem;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }

    .card-image {
        width: 100%;
        aspect-ratio: 4 / 3;
        object-fit: cover;
        display: block;
    }

    .card-content {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        padding: 1.1rem 1.25rem 1.4rem;
    }

    .card-category {
        display: inline-block;
        align-self: flex-start;
        padding: 0.3rem 0.75rem;
        border-radius: 999rem;
        background-color: var(--c-nachtgroen);
        color: var(--c-creme);
        font-size: 0.78rem;
        font-weight: 600;
    }

    .card-title {
        margin: 0;
        font-size: 1.15rem;
        font-weight: 700;
        line-height: 1.2;
        letter-spacing: -0.03em;
    }

    .card-excerpt {
        margin: 0;
        font-size: 1rem;
        line-height: 1.5;
        color: var(--c-nachtgroen);
        opacity: 0.85;
    }

    .card-link {
        margin-block-start: 0.25rem;
        font-size: 0.95rem;
        font-weight: 700;
        color: var(--c-nachtgroen);
        text-decoration: none;

        &:hover { text-decoration: underline; }
    }

    /* dots — hidden on desktop */
    .slider-nav {
        display: flex;
        justify-content: center;
        padding-block-end: 0.5rem;
    }

    .dot-list {
        display: flex;
        align-items: center;
        gap: 0.35rem;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .dot {
        display: block;
        width: 0.42rem;
        height: 0.42rem;
        border-radius: 999rem;
        background-color: rgba(32, 50, 38, 0.35);
        transition: width 0.3s ease, background-color 0.3s ease;
    }

    .dot--active {
        width: 1.1rem;
        background-color: var(--c-nachtgroen);
    }
</style>
