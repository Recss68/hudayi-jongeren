<script>
  import heroImage from '$lib/assets/test.png';
  import arrowIcon from '$lib/assets/arrow.svg';
  import dividerImage from '$lib/assets/divider.png';
  import frameImage from '$lib/assets/frame.png';
</script>

<section class="home-section">
  <div class="hero-section">
    <img src={frameImage} alt="" class="hero-frame" />

    <div class="hero-divider">
      <img src={dividerImage} alt="" class="hero-divider-image" />
    </div>

    <div class="hero-visual">
      <div class="hero-media">
        <div class="hero-track">
          <img src={heroImage} alt="Moskee aan een plein" class="hero-image" />
          <img src={heroImage} alt="Moskee aan een plein" class="hero-image" />
          <img src={heroImage} alt="Moskee aan een plein" class="hero-image" />
        </div>
      </div>

      <div class="hero-slider">
        <h2 class="sr-only">Öne çıkan görseller</h2>
        <span class="hero-slider-dot"></span>
        <span class="hero-slider-dot"></span>
        <span class="hero-slider-dot"></span>
      </div>
    </div>

    <div class="hero-content">
      <h1>Toplum için atan bir kalp</h1>

      <p>
        Hüdayi Gençlik, gençlerin manevi ve kişisel gelişimine katkı sağlamayı amaçlayan
        bir kuruluştur. Eğitimin, kardeşliğin ve toplumsal sorumluluğun uyumlu bir toplumun
        temeli olduğuna inanıyoruz.
      </p>

      <a href="/over-ons" class="hero-link">
        <span>Daha fazla oku</span>
        <img src={arrowIcon} alt="" class="hero-link-icon" />
      </a>
    </div>
  </div>
</section>

<style>
  :global(body) {
    margin: 0;
    background-color: var(--c-nachtgroen, #203226);
  }

  :global(img) {
    max-width: 100%;
  }

  :global(*),
  :global(*::before),
  :global(*::after) {
    box-sizing: border-box;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .home-section {
    width: 100%;
    min-height: 100svh;
    padding-block-start: 8.75rem;
    background-color: var(--c-nachtgroen, #203226);
    overflow-x: hidden;
  }

  .hero-section {
    position: relative;
    width: 100%;
    background-color: var(--c-creme, #f4ebcc);
  }

  .hero-frame {
    display: none;
  }

  .hero-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 7.9rem;
    padding-inline: 1.6rem;
    background-color: var(--c-nachtgroen, #203226);
  }

  .hero-divider-image {
    display: block;
    width: 100%;
    max-width: 21.875rem;
    height: auto;
  }

  .hero-visual {
    background-color: var(--c-creme, #f4ebcc);
  }

  .hero-media {
    width: 100%;
    overflow: hidden;
    background-color: var(--c-creme, #f4ebcc);
  }

  .hero-track {
    display: flex;
    width: 300%;
    animation: hero-slide 9s infinite ease-in-out;
  }

  .hero-image {
    display: block;
    flex: 0 0 calc(100% / 3);
    width: calc(100% / 3);
    aspect-ratio: 375 / 268;
    object-fit: cover;
    object-position: center;
  }

  .hero-slider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    padding-block: 0.65rem 4.7rem;
    background-color: var(--c-creme, #f4ebcc);
  }

  .hero-slider-dot {
    display: block;
    width: 0.42rem;
    height: 0.42rem;
    border-radius: 999rem;
    background-color: rgba(32, 50, 38, 0.45);
    transition:
      width 0.45s ease,
      background-color 0.45s ease;
  }

  .hero-slider-dot:nth-of-type(1) {
    animation: hero-dot-one 9s infinite ease-in-out;
  }

  .hero-slider-dot:nth-of-type(2) {
    animation: hero-dot-two 9s infinite ease-in-out;
  }

  .hero-slider-dot:nth-of-type(3) {
    animation: hero-dot-three 9s infinite ease-in-out;
  }

  .hero-content {
    padding: 0 1.7rem 3.8rem;
    background-color: var(--c-creme, #f4ebcc);
  }

  .hero-content h1 {
    max-width: 100%;
    margin: 0 0 1.2rem;
    color: var(--c-nachtgroen, #203226);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: clamp(2.25rem, 10.6vw, 2.65rem);
    font-weight: 700;
    line-height: 1.08;
    letter-spacing: -0.055em;
  }

  .hero-content p {
    max-width: 18.9rem;
    margin: 0 0 1.25rem;
    color: var(--c-nachtgroen, #203226);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.48;
    letter-spacing: -0.055em;
  }

  .hero-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    min-height: 2.5rem;
    padding: 0.5rem 0.75rem 0.55rem;
    border-radius: 999rem;
    background-color: var(--c-nachtgroen, #203226);
    color: var(--c-creme, #f4ebcc);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: clamp(0.72rem, 3.4vw, 0.82rem);
    font-weight: 700;
    line-height: 1;
    text-decoration: none;
    white-space: nowrap;
  }

  .hero-link:focus-visible {
    outline: 0.1875rem solid var(--c-nachtgroen, #203226);
    outline-offset: 0.1875rem;
  }

  .hero-link-icon {
    display: block;
    flex-shrink: 0;
    width: 0.8rem;
    height: 0.8rem;
  }

  /* The image track has three equal slides. Every 3 seconds it moves one slide to the left. */
  @keyframes hero-slide {
    0%, 28% {
      transform: translateX(0);
    }

    33%, 61% {
      transform: translateX(calc(-100% / 3));
    }

    66%, 94% {
      transform: translateX(calc(-200% / 3));
    }

    100% {
      transform: translateX(0);
    }
  }

  /* Dot one is active during the first slide and becomes active again when the loop restarts. */
  @keyframes hero-dot-one {
    0%, 27% {
      width: 1.5rem;
      background-color: var(--c-nachtgroen, #203226);
    }

    32%, 94% {
      width: 0.42rem;
      background-color: rgba(32, 50, 38, 0.45);
    }

    100% {
      width: 1.5rem;
      background-color: var(--c-nachtgroen, #203226);
    }
  }

  /* Dot two becomes active when the second slide is visible. */
  @keyframes hero-dot-two {
    0%, 27% {
      width: 0.42rem;
      background-color: rgba(32, 50, 38, 0.45);
    }

    32%, 61% {
      width: 1.5rem;
      background-color: var(--c-nachtgroen, #203226);
    }

    66%, 100% {
      width: 0.42rem;
      background-color: rgba(32, 50, 38, 0.45);
    }
  }

  /* Dot three becomes active when the third slide is visible. */
  @keyframes hero-dot-three {
    0%, 61% {
      width: 0.42rem;
      background-color: rgba(32, 50, 38, 0.45);
    }

    66%, 94% {
      width: 1.5rem;
      background-color: var(--c-nachtgroen, #203226);
    }

    100% {
      width: 0.42rem;
      background-color: rgba(32, 50, 38, 0.45);
    }
  }
  @media (min-width: 48rem) {
    .home-section {
      width: 100%;
      min-height: 100svh;
      padding: 12.5rem 1.5rem 6rem;
      background-color: var(--c-nachtgroen, #203226);
      overflow-x: hidden;
    }

    .hero-section {
      display: grid;
      position: relative;
      grid-template-columns: minmax(0, 1fr) 18rem;
      grid-template-areas: "content visual";
      align-items: center;
      column-gap: 2.75rem;
      max-width: 48rem;
      margin-inline: auto;
      min-height: 26rem;
      padding: 5.4rem 3.75rem 4.7rem;
      background-color: var(--c-creme, #f4ebcc);
    }

    .hero-frame {
      position: absolute;
      inset: 0.55rem;
      z-index: 1;
      display: block;
      width: calc(100% - 1.1rem);
      height: calc(100% - 1.1rem);
      pointer-events: none;
    }

    .hero-divider {
      position: absolute;
      top: -4.95rem;
      right: 0;
      left: 0;
      z-index: 2;
      min-height: auto;
      margin: 0;
      padding-inline: 2rem;
      background-color: transparent;
    }

    .hero-divider-image {
      max-width: 42rem;
    }

    .hero-visual {
      grid-area: visual;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      align-self: center;
      width: 100%;
    }

    .hero-media {
      width: 100%;
      max-width: 17.5rem;
      aspect-ratio: 296 / 333;
      overflow: hidden;
      border-radius: 0.45rem;
      background-color: var(--c-creme, #f4ebcc);
      box-shadow: 0 0.65rem 1.5rem rgba(32, 50, 38, 0.25);
    }

    .hero-track {
      height: 100%;
    }

    .hero-image {
      height: 100%;
      aspect-ratio: auto;
      object-fit: cover;
      object-position: center;
    }

    .hero-slider {
      justify-content: center;
      padding-block: 0.8rem 0;
      background-color: transparent;
    }

    .hero-content {
      grid-area: content;
      z-index: 2;
      align-self: center;
      padding: 0;
    }

    .hero-content h1 {
      max-width: 20rem;
      margin-block-end: 1rem;
      font-size: clamp(2rem, 3.9vw, 2.45rem);
      line-height: 1.08;
    }

    .hero-content p {
      max-width: 22rem;
      margin-block-end: 1.25rem;
      font-size: clamp(0.86rem, 1.45vw, 0.95rem);
      line-height: 1.45;
    }

    .hero-link {
      min-height: 1.5rem;
      padding: 0.6rem 0.9rem 0.66rem;
      font-size: 0.82rem;
    }
    .hero-link-icon {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
</style>
