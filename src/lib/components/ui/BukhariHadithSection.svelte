<script>
    import { onMount, onDestroy } from 'svelte';
    import { fade } from 'svelte/transition';
    import { getLocale } from '$lib/paraglide/runtime';
    import * as m from '$lib/paraglide/messages';
    import { writable } from 'svelte/store';
    import { BukhariHadiths } from '$lib';

    const hadiths = Array.isArray(BukhariHadiths) ? BukhariHadiths : [];
    const currentIndex = writable(0);
    let prefersReducedMotion = $state(false);
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
                                    {m.hadith_source_bukhari()} [{hadiths[$currentIndex].hadith_number}]
                                </h3>
                                <p class="hadith-translation" lang={getLocale()} dir="ltr">
                                    {hadiths[$currentIndex].turkish}
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
        text-align: right;
        direction: rtl;
        unicode-bidi: plaintext;
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
        justify-self: center;
        max-width: 18.5rem;
        margin: 0;
        font-family: var(--font-primary);
        font-size: 16px;
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
            margin-inline: auto;
        }

        .hadith-item {
            min-height: 23rem;
        }

        .hadith-figure {
            gap: 2.15rem;
            justify-items: center;
            align-content: center;
            width: min(100%, 42rem);
            margin-inline: auto;
        }

        .hadith-text {
            justify-self: center;
            max-width: 36rem;
            font-size: 40px;
            line-height: 1.55;
            text-align: center;
        }

        .hadith-caption {
            gap: 1.7rem;
            justify-items: center;
        }

        .hadith-title {
            max-width: 36rem;
            justify-self: center;
            font-size: 16px;
            text-align: center;
        }

        .hadith-translation { 
            max-width: 35rem;
            font-size: 16px;
            line-height: 1.7;
            text-align: center;
            letter-spacing: -0.02em;
        }
    }

    @media (min-width: 1024px) {
        .hadith-single {
            margin-inline: auto;
        }

        .hadith-text {
            font-size: 48px;
        }

        .hadith-translation {
            font-size: 1.25rem;
        }

        .hadith-figure {
            width: min(100%, 48rem);
            margin-inline: auto;
        }
    }
</style>