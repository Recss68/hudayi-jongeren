<script>
  import { onMount } from 'svelte';
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
  let hasJavaScript = $state(false);

  // Read the active locale from the URL so the hero follows the current route language.
  const activeLocale = $derived.by(() => {
    const locale = page.url.pathname.split('/')[1];

    if (supportedLocales.includes(locale)) {
      return locale;
    }

    return 'tr';
  });

  // Localized hero copy from Paraglide messages.
  const heroImageAlt = $derived(m.home_hero_image_alt({}, { locale: activeLocale }));
  const heroTitle = $derived(m.home_hero_title({}, { locale: activeLocale }));
  const heroDescription = $derived(m.home_hero_description({}, { locale: activeLocale }));
  const heroReadMore = $derived(m.home_hero_read_more({}, { locale: activeLocale }));
  const heroShowImage = $derived(m.home_hero_show_image({}, { locale: activeLocale }));
  const heroLink = $derived(`/${activeLocale}/hakkimizda`);

  // Slide data keeps the carousel markup DRY and easy to extend.
  const slides = $derived([
    {
      id: 'community',
      image: heroImage,
      alt: heroImageAlt
    },
    {
      id: 'youth',
      image: heroImageTwo,
      alt: ''
    },
    {
      id: 'education',
      image: heroImageThree,
      alt: ''
    }
  ]);

  // Enhanced fallback controls: keep anchor links for no-JS, but only scroll the carousel when JS is available.
  function handleFallbackDotClick(event, index) {
    if (!carouselElement) {
      return;
    }

    const targetSlide = carouselElement.querySelector(`[data-slide-index="${index}"]`);

    if (!targetSlide) {
      return;
    }

    event.preventDefault();

    carouselElement.scrollTo({
      left: targetSlide.offsetLeft,
      behavior: 'smooth'
    });
  }

  // Progressive enhancement: the carousel works with CSS scroll snap without JavaScript.
  // JavaScript only keeps the fallback dots in sync when native scroll markers are unavailable.
  onMount(() => {
    hasJavaScript = true;

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
</script>

<section class="home-hero">
  <!-- Decorative divider above the hero card. -->
  <img src={dividerImage} alt="" class="divider" />

  <div class="hero-card">
    <!-- Localized hero content and call to action. -->
    <div class="content">
      <h1>{heroTitle}</h1>

      <p>{heroDescription}</p>

      <a href={heroLink} class="link">
        <span>{heroReadMore}</span>
        <img src={arrowIcon} alt="" class="icon" />
      </a>
    </div>

    <div class="carousel-wrapper" style:--hero-show-image={`'${heroShowImage}'`}>
      <!-- Core carousel: horizontal scroll with CSS scroll snapping. -->
      <div class="carousel" bind:this={carouselElement}>
        {#each slides as slide, index (slide.id)}
          <figure class="slide" id={`hero-slide-${slide.id}`} data-slide-index={index}>
            <img src={slide.image} alt={slide.alt} class="hero-image" />
          </figure>
        {/each}
      </div>

      <!--
        Progressive enhancement fallback:
        without JavaScript, passive dots indicate that more slides are available;
        with JavaScript, the same visual dots become keyboard- and pointer-operable links.
      -->
      {#if hasJavaScript}
        <div class="carousel-dots">
          {#each slides as slide, index (slide.id)}
            <a
              href={`#hero-slide-${slide.id}`}
              class="dot"
              class:active-dot={activeSlide === index}
              onclick={(event) => handleFallbackDotClick(event, index)}
            >
              <span class="sr-only">{heroShowImage} {index + 1}</span>
            </a>
          {/each}
        </div>
      {:else}
        <div class="carousel-dots carousel-indicators">
          {#each slides as slide, index (slide.id)}
            <span class="dot" class:active-dot={index === 0}></span>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  .home-hero {
    display: grid;
    justify-items: center;
    gap: var(--space-20);
    padding: var(--space-24) 16px var(--space-4);
    background-color: var(--c-night-green);
    /* Establishes the Hero as a named inline-size query container. */
    container: hero / inline-size;
  }

  .hero-card {
    position: relative;
    overflow: clip;
    display: flex;
    flex-direction: column;
    width: min(100%, 343px);
    padding: 16px 16px 32px;
    border-radius: 12px;
    background-color: var(--c-cream);
    color: var(--c-hero-text);
    font-family: var(--font-primary, 'Plus Jakarta Sans', sans-serif);
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
    margin-block-start: var(--space-8);
    gap: var(--space-3, 12px);
    --carousel-marker-size: 6px;
    --carousel-marker-size-active: 18px;
    --carousel-marker-gap: 6px;
    --carousel-marker-transition:
      width 180ms ease,
      background-color 180ms ease;
  }

  /* Core carousel: CSS scroll snap keeps the carousel usable without JavaScript. */
  .carousel {
    display: flex;
    gap: var(--space-3, 12px);
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

  /*
   * Scroll-driven carousel image emphasis.
   * Source: https://scroll-driven-animations.style/
   * Each image responds to its horizontal position inside the scroll container.
   */
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

  /*
   * Fallback controls for browsers without native ::scroll-marker support.
   * Source: https://www.jomaendle.com/blog/css-carousel
   * The article describes scroll markers as interactive position indicators.
   * These HTML links mirror that behaviour while using a larger click target.
   */
  .carousel-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--carousel-marker-gap);
  }

  .carousel-indicators .dot {
    pointer-events: none;
  }

  .dot {
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
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
    gap: var(--space-4, 16px);
    padding-block-start: 32px;

    & :is(h1, p) {
      margin: 0;
    }

    & h1 {
      color: var(--c-hero-text);
      font-size: clamp(28px, 8vw, 32px);
      font-weight: 700;
      line-height: 1.1;
      letter-spacing: -0.04em;
    }

    & p {
      color: var(--c-hero-body-text);
      font-size: 14px;
      font-weight: 400;
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
    padding: 0 16px;
    border-radius: var(--radius-pill);
    background-color: var(--c-hero-button-fill);
    color: var(--c-cream);
    font-size: 12px;
    font-weight: 700;
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

  /*
   * The New Responsive — macro layout:
   * this viewport-based media query adjusts page-level spacing.
   */
  @media (min-width: 768px) {
    .home-hero {
      padding: var(--space-24) 0 var(--space-12);
    }
  }

  @media (min-width: 1100px) {
    .home-hero {
      padding: var(--space-12) 0 var(--space-8);
    }
  }

  /*
   * The New Responsive — component layout:
   * this container query lets the Hero respond to its own available width
   * instead of depending only on the viewport width.
   */
  @container hero (min-width: 768px) {
    .hero-card {
      display: grid;
      grid-template-columns: minmax(260px, 1fr) 340px;
      align-items: start;
      gap: clamp(48px, 7cqi, 96px);
      width: min(100%, 1024px);
      min-height: 500px;
      padding: 72px 32px 72px 40px;
      border-radius: 0;
    }

    .carousel-wrapper {
      order: 2;
      width: 340px;
      justify-self: end;
      margin-block-start: 0;
    }

    .content {
      order: 1;
      align-self: center;
      gap: var(--space-5);
      height: auto;
      padding-block-start: 0;
    }

    .link {
      margin-block-start: var(--space-5);
    }

    .content h1 {
      max-width: 12ch;
      font-size:  clamp(30px, 4vw, 36px);
    }

    .content p {
      max-width: 35ch;
      font-size: 14px;
    }
  }

  /*
   * The New Responsive — desktop component layout:
   * the Hero fills the available desktop width while the inner content
   * scales from the tablet composition based on the container size.
   */
  @container hero (min-width: 1100px) {
    .hero-card {
      grid-template-columns: minmax(0, 420px) 420px;
      justify-content: center;
      gap: 80px;
      width: 100%;
      min-height: auto;
      padding: var(--space-12) clamp(48px, 5cqi, 80px);
      border-radius: 0;
    }

    .carousel-wrapper {
      width: 420px;
      justify-self: end;
      align-self: center;
      --carousel-marker-size: 10px;
      --carousel-marker-size-active: 28px;
      --carousel-marker-gap: 10px;
    }

    .hero-image {
      aspect-ratio: 4 / 5;
    }

    .content {
      align-self: center;
      gap: var(--space-5);
      height: auto;
      padding-block-start: 0;
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
      margin-block-start: var(--space-5);
      padding-inline: var(--space-5);
      font-size: var(--fs-hero-cta-desktop);
    }
  }

  /*
   * Reduce motion for users who prefer it.
   */
  @media (prefers-reduced-motion: reduce) {
    .hero-image {
      animation: none;
    }
  }

  /*
   * Native CSS carousel enhancement:
   * Chromium browsers can generate stateful markers with ::scroll-marker.
   * The visual design uses dots only, so ::scroll-button arrows are intentionally not enabled.
   */
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
        content: ' ' / var(--hero-show-image) ' ' counter(slide-counter);
        width: var(--carousel-marker-size);
        height: var(--carousel-marker-size);
        border-radius: var(--radius-pill);
        background-color: var(--c-hero-dot-muted);
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