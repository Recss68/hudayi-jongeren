<script>
  import { onMount, tick } from 'svelte';
  import { gsap } from 'gsap';
  import heroImage from '$lib/assets/test.jpg';
  import heroImageTwo from '$lib/assets/test2.jpg';
  import heroImageThree from '$lib/assets/test3.jpg';
  import arrowIcon from '$lib/assets/arrow.svg';
  import dividerImage from '$lib/assets/divider.svg';
  import { page } from '$app/state';
  import * as m from '$lib/paraglide/messages';

  // Supported route locales. Turkish is used as the default fallback.
  const supportedLocales = ['nl', 'en', 'tr'];

  let carouselElement = $state();
  let activeSlide = $state(0);
  let heroTitleElement = $state();

  let split;
  let titleTween;
  let splitTextPlugin;
  let heroIsMounted = $state(false);

  // Read the active locale from the URL so the hero follows the current route language.
  const activeLocale = $derived.by(() => {
    const locale = page.url.pathname.split('/')[1];

    if (supportedLocales.includes(locale)) {
      return locale;
    }

    return 'tr';
  });

  // Reads a Paraglide message in the currently active locale.
  const t = (key) => m[key]({}, { locale: activeLocale });

  // Localized hero copy from Paraglide messages.
  const heroImageAlt = $derived(t('home_hero_image_alt'));
  const heroTitle = $derived(t('home_hero_title'));
  const heroDescription = $derived(t('home_hero_description'));
  const heroReadMore = $derived(t('home_hero_read_more'));
  const heroShowImage = $derived(t('home_hero_show_image'));
  const heroLink = $derived(`/${activeLocale}/hakkimizda`);

  // Slide data keeps the carousel markup DRY and easy to extend.
  const slides = $derived([
    {
      id: 'community',
      targetId: 'hero-slide-community',
      image: heroImage,
      alt: heroImageAlt
    },
    {
      id: 'youth',
      targetId: 'hero-slide-youth',
      image: heroImageTwo,
      alt: ''
    },
    {
      id: 'education',
      targetId: 'hero-slide-education',
      image: heroImageThree,
      alt: ''
    }
  ]);

  async function animateHeroTitle() {
    if (
      !heroIsMounted ||
      !heroTitleElement ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    try {
      if (!splitTextPlugin) {
        const SplitTextModule = await import('gsap/SplitText');

        splitTextPlugin =
          SplitTextModule?.default || SplitTextModule?.SplitText || SplitTextModule;

        if (!splitTextPlugin) {
          console.warn('SplitText plugin is unavailable.');
          return;
        }

        gsap.registerPlugin(splitTextPlugin);
      }

      titleTween?.kill();
      split?.revert();

      await tick();

      split = new splitTextPlugin(heroTitleElement, {
        type: 'words,chars',
        wordsClass: 'hero-word'
      });

      titleTween = gsap.from(split.chars, {
        y: 8,
        opacity: 0,
        stagger: 0.05,
        delay: 0.2,
        duration: 0.45,
        ease: 'power2.out'
      });
    } catch (error) {
      console.warn('Error while running the SplitText animation:', error);
    }
  }

  // Animate the localized title after mounting.
  onMount(() => {
    heroIsMounted = true;

    return () => {
      heroIsMounted = false;
      titleTween?.kill();
      split?.revert();
    };
  });

  // Rebuild SplitText whenever the localized title changes.
  $effect(() => {
    heroTitle;

    if (!heroIsMounted) {
      return;
    }

    animateHeroTitle();
  });

  // Keep fallback dots synchronized when native scroll markers are unavailable.
  onMount(() => {
    const supportsScrollMarkers = CSS.supports('selector(::scroll-marker)');

    if (!carouselElement || !('IntersectionObserver' in window) || supportsScrollMarkers) {
      return;
    }

    const slideElements = carouselElement.querySelectorAll('.slide');

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeSlide = Number(entry.target.dataset.slideIndex);
          }
        }
      },
      {
        root: carouselElement,
        threshold: 0.65
      }
    );

    for (const slideElement of slideElements) {
      observer.observe(slideElement);
    }

    return () => observer.disconnect();
  });

  // Keep anchor navigation as the no-JavaScript baseline.
  function handleFallbackDotClick(event, slide) {
    if (!carouselElement) {
      return;
    }

    const targetSlide = document.getElementById(slide.targetId);

    if (!targetSlide) {
      return;
    }

    event.preventDefault();

    carouselElement.scrollTo({
      left: targetSlide.offsetLeft,
      behavior: 'smooth'
    });
  }
</script>

<section class="home-hero">
  <img src={dividerImage} alt="" class="divider" />

  <div class="hero-card">
    <div class="content">
      {#key heroTitle}
        <h1 bind:this={heroTitleElement}>{heroTitle}</h1>
      {/key}

      <p>{heroDescription}</p>

      <a href={heroLink} class="link">
        <span>{heroReadMore}</span>
        <img src={arrowIcon} alt="" class="icon" />
      </a>
    </div>

    <div class="carousel-wrapper" style:--hero-show-image={`'${heroShowImage}'`}>
      <div class="carousel" bind:this={carouselElement}>
        {#each slides as slide, index (slide.id)}
          <figure class="slide" id={slide.targetId} data-slide-index={index}>
            <img src={slide.image} alt={slide.alt} class="hero-image" />
          </figure>
        {/each}
      </div>

      <div class="carousel-dots">
        {#each slides as slide, index (slide.id)}
          <a
            href={`#${slide.targetId}`}
            class="dot"
            class:active-dot={activeSlide === index}
            onclick={(event) => handleFallbackDotClick(event, slide)}
          >
            <span class="sr-only">{heroShowImage} {index + 1}</span>
          </a>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .home-hero {
    display: grid;
    justify-items: center;
    gap: var(--space-20);
    padding: var(--space-24) var(--space-4) var(--space-4);
    background-color: var(--c-night-green);
    container: hero / inline-size;
  }

  .hero-card {
    position: relative;
    overflow: clip;
    display: flex;
    flex-direction: column;
    width: min(100%, 343px);
    padding: var(--space-4) var(--space-4) var(--space-8);
    border-radius: 12px;
    background-color: var(--c-cream);
    color: var(--c-hero-text);
    font-family: var(--font-primary);
  }

  .divider {
    display: block;
    width: min(60%, 250px);
    height: auto;
    pointer-events: none;
  }

  .carousel-wrapper {
    position: relative;
    z-index: 2;
    display: grid;
    order: 2;
    gap: var(--space-3);
    margin-block-start: var(--space-8);

    --carousel-marker-size: 6px;
    --carousel-marker-size-active: 18px;
    --carousel-marker-gap: 6px;
    --carousel-marker-transition:
      width 180ms ease,
      background-color 180ms ease;
  }

  .carousel {
    display: flex;
    gap: var(--space-3);
    width: 100%;
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    scrollbar-width: none;
    counter-reset: slide-counter;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .slide {
    flex: 0 0 100%;
    margin: 0;
    scroll-snap-align: center;
    scroll-snap-stop: always;
    counter-increment: slide-counter;
  }

  .hero-image {
    display: block;
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 8px;
    object-fit: cover;
  }

  @supports (animation-timeline: view(inline)) {
    .hero-image {
      animation-name: hero-image-emphasis;
      animation-duration: 1ms;
      animation-fill-mode: both;
      animation-timing-function: ease-in-out;
      animation-timeline: view(inline);
      animation-range: cover 0% cover 100%;
    }

    @keyframes hero-image-emphasis {
      0%,
      100% {
        opacity: 0.8;
        transform: scale(0.96);
      }

      50% {
        opacity: 1;
        transform: scale(1);
      }
    }
  }

  .carousel-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--carousel-marker-gap);
  }

  .dot {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    border-radius: var(--radius-pill);
    text-decoration: none;

    &::before {
      width: var(--carousel-marker-size);
      height: var(--carousel-marker-size);
      border-radius: var(--radius-pill);
      background-color: var(--c-hero-dot-muted);
      content: '';
      transition: var(--carousel-marker-transition);
    }

    &:focus-visible {
      outline: 2px solid var(--c-hero-text);
      outline-offset: 2px;
    }
  }

  .active-dot::before {
    width: var(--carousel-marker-size-active);
    background-color: var(--c-hero-dot);
  }

  .content {
    position: relative;
    z-index: 2;
    display: flex;
    order: 1;
    flex-direction: column;
    gap: var(--space-4);
    padding-block-start: var(--space-8);

    & :is(h1, p) {
      margin: 0;
    }

    & h1 {
      color: var(--c-hero-text);
      font-size: var(--fs-hero-heading-mobile);
      font-weight: var(--fw-bold);
      line-height: var(--lh-tight);
      letter-spacing: -0.04em;

      :global(.hero-word) {
        display: inline-block;
        white-space: nowrap;
      }
    }

    & p {
      color: var(--c-hero-body-text);
      font-size: var(--fs-hero-body-mobile);
      font-weight: var(--fw-regular);
      line-height: 1.5;
    }
  }

  .link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: max-content;
    min-height: 36px;
    margin-block-start: var(--space-5);
    padding: 0 var(--space-4);
    border-radius: var(--radius-pill);
    background-color: var(--c-hero-button-fill);
    color: var(--c-cream);
    font-size: var(--fs-hero-cta-mobile);
    font-weight: var(--fw-bold);
    line-height: 1;
    text-decoration: none;

    &:focus-visible {
      outline: 3px solid var(--c-hero-button-fill);
      outline-offset: 4px;
    }

    & .icon {
      width: 12px;
      height: 12px;
      flex: 0 0 auto;
    }
  }

  .sr-only {
    position: absolute;
    overflow: hidden;
    width: 1px;
    height: 1px;
    padding: 0;
    border: 0;
    margin: -1px;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }

  @media (min-width: 768px) {
    .home-hero {
      padding: var(--space-24) 0 var(--space-12);
    }
  }

  @media (min-width: 1000px) {
    .home-hero {
      gap: var(--space-12);
      padding: var(--space-8) 0;
    }
  }

  @container hero (min-width: 768px) {
    .hero-card {
      display: grid;
      grid-template-columns: minmax(260px, 1fr) 340px;
      align-items: start;
      gap: clamp(48px, 7cqi, 96px);
      width: min(100%, 1024px);
      min-height: auto;
      padding: var(--space-12) clamp(48px, 5cqi, 80px);
      border-radius: 0;
    }

    .carousel-wrapper {
      order: 2;
      width: 340px;
      justify-self: end;
      margin-block-start: 0;

      --carousel-marker-size: 10px;
      --carousel-marker-size-active: 28px;
      --carousel-marker-gap: 10px;
    }

    .content {
      order: 1;
      align-self: center;
      gap: var(--space-5);
      height: auto;
      padding-block-start: 0;
    }

    .content h1 {
      max-width: 12ch;
      font-size: var(--fs-hero-heading-tablet);
    }

    .content p {
      max-width: 35ch;
      font-size: var(--fs-hero-body-tablet);
    }
  }

  @container hero (min-width: 1000px) {
    .hero-card {
      grid-template-columns: minmax(0, 420px) minmax(380px, 420px);
      justify-content: center;
      gap: clamp(48px, 5cqi, 80px);
      width: 100%;
    }

    .carousel-wrapper {
      width: min(100%, 420px);
      align-self: center;
    }

    .hero-image {
      aspect-ratio: 4 / 5;
    }

    .content h1 {
      max-width: 18ch;
      font-size: var(--fs-hero-heading-desktop);
    }

    .content p {
      max-width: 48ch;
      font-size: var(--fs-hero-body-desktop);
      line-height: var(--lh-body);
    }

    .link {
      min-height: 44px;
      padding-inline: var(--space-5);
      font-size: var(--fs-hero-cta-desktop);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-image {
      animation: none;
    }

    .content h1 {
      opacity: 1;
      transform: none;
    }
  }

  @supports selector(::scroll-marker) {
    .carousel {
      scroll-marker-group: after;

      &::scroll-marker-group {
        display: flex;
        justify-content: center;
        gap: var(--carousel-marker-gap);
        margin-block-start: 10px;
      }
    }

    .slide {
      &::scroll-marker {
        width: var(--carousel-marker-size);
        height: var(--carousel-marker-size);
        border-radius: var(--radius-pill);
        background-color: var(--c-hero-dot-muted);
        content: ' ' / var(--hero-show-image) ' ' counter(slide-counter);
        transition: var(--carousel-marker-transition);
      }

      &::scroll-marker:target-current {
        width: var(--carousel-marker-size-active);
        background-color: var(--c-hero-dot);
      }
    }

    .carousel-dots {
      display: none;
    }
  }
</style>