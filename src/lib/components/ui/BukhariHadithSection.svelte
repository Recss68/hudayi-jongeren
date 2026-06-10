<script>
    import { onMount, onDestroy } from 'svelte';
    import { fade } from 'svelte/transition';
    import { page } from '$app/state';
    import * as m from '$lib/paraglide/messages';
    import { writable } from 'svelte/store';
    import { BukhariHadiths } from '$lib';

    const hadiths = Array.isArray(BukhariHadiths) ? BukhariHadiths : [];
    const currentIndex = writable(0);
    let prefersReducedMotion = $state(false);
    let intervalId;

    const activeLocale = $derived.by(() => {
        const locale = page.url.pathname.split('/')[1];

        if (locale === 'nl' || locale === 'en' || locale === 'tr') {
            return locale;
        }

        return 'tr';
    });

    function getHadithTranslation(hadith) {
        return hadith?.translations?.[activeLocale] ?? hadith?.translations?.tr ?? hadith?.turkish ?? '';
    }

    function stopRotation() {
        if (!intervalId) return;

        clearInterval(intervalId);
        intervalId = undefined;
    }

    function startRotation() {
        if (!hadiths.length || prefersReducedMotion || intervalId) return;

        intervalId = setInterval(() => {
            currentIndex.update((n) => (n + 1) % hadiths.length);
        }, 5000);
    }

    onMount(() => {
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        function handleMotionPreferenceChange(event) {
            prefersReducedMotion = event.matches;

            if (prefersReducedMotion) {
                stopRotation();
                currentIndex.set(0);
                return;
            }

            startRotation();
        }

        prefersReducedMotion = motionQuery.matches;

        if (prefersReducedMotion) {
            currentIndex.set(0);
        } else {
            startRotation();
        }

        motionQuery.addEventListener('change', handleMotionPreferenceChange);

        return () => {
            motionQuery.removeEventListener('change', handleMotionPreferenceChange);
            stopRotation();
        };
    });

    onDestroy(() => {
        stopRotation();
    });
</script>

<section class="section bukhari-hadith-section">
    <div class="bukhari-hadith-section__inner">

        <div class="hadith-single">
            {#if hadiths.length}
                {#key $currentIndex}
                    <article class="hadith-item" transition:fade={{ duration: prefersReducedMotion ? 0 : 400 }}>
                        <figure class="hadith-figure">
                            <blockquote class="hadith-text" lang="ar" dir="rtl">
                                <p>{hadiths[$currentIndex].arabic}</p>
                            </blockquote>

                            <figcaption class="hadith-caption">
                                <h3 class="hadith-title">
                                    {m.hadith_source_bukhari()} [{hadiths[$currentIndex].hadith_number}]
                                </h3>
                                <p class="hadith-translation" lang={activeLocale} dir="ltr">
                                    {getHadithTranslation(hadiths[$currentIndex])}
                                </p>
                            </figcaption>
                        </figure>
                    </article>
                {/key}
            {:else}
                <p class="hadith-empty">{m.hadith_empty()}</p>
            {/if}
        </div>
    </div>
</section>

<style>
    .bukhari-hadith-section__inner {
        position: relative;
        height: 50vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        background-color: var(--c-nachtgroen);
        color: var(--c-creme);
    }

    .hadith-single {
        position: relative;
        display: grid;
        width: 100%;
        z-index: 1;
        overflow: hidden;
    }

    .hadith-item {
        grid-area: 1 / 1;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0.25rem 0;
        gap: 0.5rem;
    }

    .hadith-figure {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        margin: 0;
    }

    .hadith-text {
        margin: 0 0 0.5rem 0;
        font-family: var(--font-arabic);
        font-size: 30px;
        font-weight: 400;
        line-height: 1.9;
        text-align: center;
        direction: rtl;
        unicode-bidi: plaintext;
        z-index: 1;
    }

    .hadith-text p {
        margin: 0;
    }

    .hadith-caption {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
    }

    .hadith-title {
        margin: 0 0 0.5rem 0;
        font-family: var(--font-primary);
        font-size: 16px;
        font-weight: var(--fw-bold);
        line-height: 1.45;
        text-align: center;
        letter-spacing: -0.03em;
        z-index: 1;
    }

    .hadith-translation {
        margin: 0;
        font-size: 16px;
        font-weight: var(--fw-light);
        line-height: 1.55;
        letter-spacing: -0.04em;
        text-align: center;
        z-index: 1;
    }

    .hadith-figure > .hadith-text,
    .hadith-caption > .hadith-title,
    .hadith-caption > .hadith-translation {
        width: min(90%, 700px);
    }

    .hadith-empty {
        margin: 0;
        font-family: var(--font-primary);
        font-size: 1rem;
        line-height: 1.5;
    }

    @media (min-width: 768px) {
        .hadith-text {
            font-size: 40px;
            line-height: 1.55;
        }
    }

    @media (min-width: 1024px) {
        .hadith-text {
            font-size: 48px;
        }
    }
</style>