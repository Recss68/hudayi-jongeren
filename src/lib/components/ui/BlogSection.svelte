<script>
    import { onMount } from 'svelte';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import * as m from '$lib/paraglide/messages';
    import DummyArticles from '$lib/data/dummy-articles.json';

    const articles = Array.isArray(DummyArticles) ? DummyArticles : [];

    function getArticleContent(article) {
        return article?.translations?.[activeLocale] ?? article?.translations?.tr ?? {
            category: article?.categorie ?? '',
            title: article?.titel ?? '',
            excerpt: article?.excerpt ?? '',
            date: article?.datum ?? ''
        };
    }

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
    const activeLocale = $derived.by(() => {
        const locale = page.url.pathname.split('/')[1];

        if (locale === 'nl' || locale === 'en' || locale === 'tr') {
            return locale;
        }

        return 'tr';
    });
</script>

<section class="section blog-section">
    <div class="section-inner">
        <div class="section-header">
            <h2>{m.blog_heading({}, { locale: activeLocale })}</h2>
            <a href={resolve('/haberler')} class="header-link">{m.blog_view_all({}, { locale: activeLocale })}</a>
        </div>

        <div class="articles-wrapper">
            <ul class="article-track" bind:this={trackEl}>
                {#each articles as article (article.id)}
                    <li class="article-card">
                        <img src={article.afbeelding} alt={getArticleContent(article).title} class="card-image" />
                        <div class="card-content">
                            <span class="card-category">{getArticleContent(article).category}</span>
                            <h3 class="card-title">{getArticleContent(article).title}</h3>
                            <p class="card-excerpt">{getArticleContent(article).excerpt}</p>
                            <a href={resolve(`/haberler/${article.slug}`)} class="card-link">{m.blog_read_more({}, { locale: activeLocale })} →</a>
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

        @media (min-width: 768px) {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            overflow: visible;
            padding-inline: 0;
        }
    }

    .article-card {
        flex: 0 0 calc(100% - 2.5rem);
        scroll-snap-align: start;
        background-color: #fff;
        border-radius: 0.75rem;
        overflow: hidden;
        display: flex;
        flex-direction: column;

        @media (min-width: 768px) {
            flex: unset;
        }
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

        @media (min-width: 768px) { display: none; }
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
