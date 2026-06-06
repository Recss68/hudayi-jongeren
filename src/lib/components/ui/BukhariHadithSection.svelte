<script>
    import { onMount, onDestroy } from 'svelte';
    import { fade } from 'svelte/transition';
    import { writable } from 'svelte/store';
    import { BukhariHadiths } from '$lib';

    const hadiths = Array.isArray(BukhariHadiths) ? BukhariHadiths : [];
    const currentIndex = writable(0);
    let prefersReducedMotion = false;
    let intervalId;

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
                                    {hadiths[$currentIndex].source} [{hadiths[$currentIndex].hadith_number}]
                                </h3>
                                <p class="hadith-translation" lang="tr" dir="ltr">
                                    {hadiths[$currentIndex].turkish}
                                </p>
                            </figcaption>
                        </figure>
                    </article>
                {/key}
            {:else}
                <p class="hadith-empty">Hadis bulunamadı.</p>
            {/if}
        </div>

        <noscript>
            {#if hadiths.length}
                <article class="hadith-item hadith-item--fallback">
                    <figure class="hadith-figure">
                        <blockquote class="hadith-text" lang="ar" dir="rtl">
                            <p>{hadiths[0].arabic}</p>
                        </blockquote>

                        <figcaption class="hadith-caption">
                            <h3 class="hadith-title">
                                {hadiths[0].source} [{hadiths[0].hadith_number}]
                            </h3>
                            <p class="hadith-translation" lang="tr" dir="ltr">
                                {hadiths[0].turkish}
                            </p>
                        </figcaption>
                    </figure>
                </article>
            {/if}
        </noscript>
        
    </div>
</section>

<style>
    .bukhari-hadith-section__inner {
        position: relative;
        display: grid;
        align-items: start;
        min-height: 42rem;
        overflow: hidden;
        background-color: var(--c-nachtgroen);
        color: var(--c-creme);
        padding: 7.25rem 1.75rem 4.5rem;
    }

    .hadith-single {
        position: relative;
        display: grid;
        width: 100%;
        z-index: 1;
    }

    .hadith-item {
        grid-area: 1 / 1;
        width: 100%;
        min-height: 30rem;
    }

    .hadith-item--fallback {
        grid-area: auto;
    }

    .hadith-figure {
        display: grid;
        gap: 2.6rem;
        align-content: start;
        margin: 0;
    }

    .hadith-text {
        justify-self: start;
        width: 100%;
        max-width: 18.5rem;
        margin: 0;
        font-family: var(--font-arabic);
        font-size: 30px;
        font-weight: 400;
        line-height: 1.9;
        text-align: left;
    }

    .hadith-text p {
        margin: 0;
    }

    .hadith-caption {
        display: grid;
        gap: 1.5rem;
        justify-items: center;
    }

    .hadith-title {
        width: 100%;
        max-width: 18.5rem;
        margin: 0;
        font-family: var(--font-primary);
        font-size: 1rem;
        font-weight: var(--fw-bold);
        line-height: 1.45;
        text-align: center;
        letter-spacing: -0.03em;
    }

    .hadith-translation {
        width: 100%;
        max-width: 18.5rem;
        margin: 0;
        font-family: var(--font-primary);
        font-size: clamp(1.15rem, 5.6vw, 1.6rem);
        font-weight: var(--fw-light);
        line-height: 1.55;
        letter-spacing: -0.04em;
        text-align: left;
    }

    .hadith-empty {
        margin: 0;
        font-family: var(--font-primary);
        font-size: 1rem;
        line-height: 1.5;
    }


    @media (min-width: 768px) {
        .bukhari-hadith-section__inner {
            min-height: 33rem;
            padding: 5rem 3.5rem 5.5rem;
            place-items: center;
        }

        .hadith-single {
            max-width: 42rem;
            margin-inline: 0 auto;
        }

        .hadith-item {
            min-height: 23rem;
        }

        .hadith-figure {
            gap: 2.15rem;
            justify-items: start;
            align-content: center;
            width: min(100%, 42rem);
            margin-inline: 0 auto;
        }

        .hadith-text {
            justify-self: start;
            max-width: 36rem;
            font-size: 40px;
            line-height: 1.55;
            text-align: left;
        }

        .hadith-caption {
            gap: 1.7rem;
            justify-items: start;
        }

        .hadith-title {
            max-width: 36rem;
            font-size: 1rem;
            text-align: left;
        }

        .hadith-translation {
            max-width: 35rem;
            font-size: 1.05rem;
            line-height: 1.7;
            text-align: left;
            letter-spacing: -0.02em;
        }
    }

    @media (min-width: 1024px) {
        .hadith-single {
            margin-inline: 14rem auto;
        }

        .hadith-text {
            font-size: 48px;
        }

        .hadith-title {
            font-size: 1.15rem;
        }

        .hadith-translation {
            font-size: 1.25rem;
        }

        .hadith-figure {
            width: min(100%, 48rem);
            margin-inline: 0 auto;
        }
    }
</style>