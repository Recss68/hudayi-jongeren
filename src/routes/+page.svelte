<script>
  import heroImage from '$lib/assets/test.png';
  import arrowIcon from '$lib/assets/arrow.svg';
  import dividerImage from '$lib/assets/divider.svg';
  import frameImage from '$lib/assets/frame.svg';
  import { QuranVerseSection } from '$lib';
</script>

<header class="home-header">
  <article class="hero-card">
    <img src={frameImage} alt="" class="frame" aria-hidden="true" />

    <div class="divider">
      <img src={dividerImage} alt="" aria-hidden="true" />
    </div>

    <figure class="visual">
      <div class="media">
        <div class="track">
          <img src={heroImage} alt="Moskee aan een plein" />
          <img src={heroImage} alt="Moskee aan een plein" />
          <img src={heroImage} alt="Moskee aan een plein" />
        </div>
      </div>

      <figcaption class="slider-nav">
        <h2 class="sr-only">Öne çıkan görseller</h2>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </figcaption>
    </figure>

    <div class="content">
      <h1>Toplum için atan bir kalp</h1>
      <p>
        Hüdayi Gençlik, gençlerin manevi ve kişisel gelişimine katkı sağlamayı amaçlayan
        bir kuruluştur. Eğitimin, kardeşliğin ve toplumsal sorumluluğun uyumlu bir toplumun
        temeli olduğuna inanıyoruz.
      </p>

      <a href="/over-ons" class="link">
        <span>Daha fazla oku</span>
        <img src={arrowIcon} alt="" class="icon" aria-hidden="true" />
      </a>
    </div>
  </article>
</header>

<QuranVerseSection />

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

  .home-header {
    width: 100%;
    min-height: 100svh;
    padding-block-start: 8.75rem;
    background-color: var(--c-nachtgroen, #203226);
    overflow-x: hidden;

    @media (min-width: 48rem) {
      padding: 12.5rem 0.75rem 6rem;
    }

    @media (min-width: 64rem) {
      padding: 9rem 2rem 7rem;
    }
  }

  .hero-card {
    position: relative;
    width: 100%;
    background-color: var(--c-creme, #f4ebcc);

    @media (min-width: 48rem) {
      display: grid;
      grid-template-columns: minmax(0, 20rem) 18rem;
      grid-template-areas: "content visual";
      align-items: center;
      justify-content: center;
      align-content: center;
      column-gap: 2.75rem;
      max-width: calc(100vw - 1.5rem);
      margin-inline: auto;
      aspect-ratio: 1086 / 550;
      min-height: auto;
      padding: 4rem 4.25rem;
      overflow: visible;
    }

    @media (min-width: 64rem) {
      grid-template-columns: minmax(0, 22rem) 19rem;
      column-gap: 3rem;
      max-width: 58rem;
      aspect-ratio: 1086 / 631;
      padding: 4.7rem 4rem 4.4rem;
    }

    @media (min-width: 90rem) {
      grid-template-columns: minmax(0, 25.5rem) 23.5rem;
      column-gap: 3.75rem;
      max-width: 70rem;
      padding: 5rem 5rem 4.75rem;
    }

    .frame {
      display: none;

      @media (min-width: 48rem) {
        position: absolute;
        inset: 0.35rem;
        z-index: 1;
        display: block;
        width: calc(100% - 0.7rem);
        height: calc(100% - 0.7rem);
        object-fit: fill;
        object-position: center;
        pointer-events: none;
      }

      @media (min-width: 64rem) {
        inset: 0.65rem;
        width: calc(100% - 1.3rem);
        height: calc(100% - 1.3rem);
      }
    }

    .divider {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 7.9rem;
      background-color: var(--c-nachtgroen, #203226);

      @media (min-width: 48rem) {
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

      @media (min-width: 64rem) {
        top: -5.2rem;
        padding-inline: 5rem;
      }

      img {
        display: block;
        width: 100%;
        max-width: 48rem;
        height: auto;

        @media (min-width: 48rem) { max-width: 42rem; }
        @media (min-width: 64rem) { max-width: 46rem; }
        @media (min-width: 90rem) { max-width: 56rem; }
      }
    }

    .visual {
      margin: 0;
      background-color: var(--c-creme, #f4ebcc);

      @media (min-width: 48rem) {
        grid-area: visual;
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        align-self: center;
        justify-self: center;
        width: 100%;
        transform: translateY(0.15rem);
      }

      .media {
        width: 100%;
        overflow: hidden;
        background-color: var(--c-creme, #f4ebcc);

        @media (min-width: 48rem) {
          max-width: 17.5rem;
          aspect-ratio: 296 / 333;
          border-radius: 0.45rem;
          box-shadow: 0 0.65rem 1.5rem rgba(32, 50, 38, 0.25);
        }

        @media (min-width: 64rem) { max-width: 19rem; }
        @media (min-width: 90rem) { max-width: 23.5rem; aspect-ratio: 296 / 390; }

        .track {
          display: flex;
          width: 300%;
          /* Three slides sit next to each other in one track. The track is 300% wide, so every image takes one third of the total width. */
          animation: hero-slide 9s infinite ease-in-out;

          @media (min-width: 48rem) { height: 100%; }

          img {
            display: block;
            flex: 0 0 calc(100% / 3);
            width: calc(100% / 3);
            aspect-ratio: 375 / 268;
            object-fit: cover;
            object-position: center;

            @media (min-width: 48rem) {
              height: 100%;
              aspect-ratio: auto;
            }
          }
        }
      }

      .slider-nav {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.35rem;
        padding-block: 0.65rem 4.7rem;
        background-color: var(--c-creme, #f4ebcc);

        @media (min-width: 48rem) {
          padding-block: 0.8rem 0;
          background-color: transparent;
        }

        .dot {
          display: block;
          width: 0.42rem;
          height: 0.42rem;
          border-radius: 999rem;
          background-color: rgba(32, 50, 38, 0.45);
          transition: width 0.45s ease, background-color 0.45s ease;

          &:nth-of-type(1) { animation: hero-dot-one 9s infinite ease-in-out; }
          &:nth-of-type(2) { animation: hero-dot-two 9s infinite ease-in-out; }
          &:nth-of-type(3) { animation: hero-dot-three 9s infinite ease-in-out; }
        }
      }
    }

    .content {
      padding: 0 1.7rem 3.8rem;
      background-color: var(--c-creme, #f4ebcc);

      @media (min-width: 48rem) {
        grid-area: content;
        z-index: 2;
        align-self: center;
        justify-self: center;
        padding: 0;
        transform: translateY(0.15rem);
      }

      h1 {
        max-width: 100%;
        margin: 0 0 1.2rem;
        color: var(--c-nachtgroen, #203226);
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: clamp(2.25rem, 10.6vw, 2.65rem);
        font-weight: 700;
        line-height: 1.08;
        letter-spacing: -0.055em;

        @media (min-width: 48rem) {
          max-width: 20rem;
          margin-block-end: 1rem;
          font-size: clamp(2rem, 3.9vw, 2.45rem);
        }

        @media (min-width: 64rem) {
          max-width: 22rem;
          font-size: clamp(2.25rem, 3vw, 2.75rem);
        }

        @media (min-width: 90rem) {
          max-width: 25.5rem;
          margin-block-end: 1.15rem;
          font-size: clamp(2.65rem, 3.3vw, 3.25rem);
          line-height: 1.07;
        }
      }

      p {
        max-width: 18.9rem;
        margin: 0 0 1.25rem;
        color: var(--c-nachtgroen, #203226);
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.48;
        letter-spacing: -0.055em;

        @media (min-width: 48rem) {
          max-width: 22rem;
          font-size: clamp(0.86rem, 1.45vw, 0.95rem);
          line-height: 1.45;
        }

        @media (min-width: 64rem) {
          max-width: 24rem;
          margin-block-end: 1.35rem;
          font-size: 0.92rem;
          line-height: 1.48;
        }

        @media (min-width: 90rem) {
          max-width: 28rem;
          margin-block-end: 1.5rem;
          font-size: 1rem;
          line-height: 1.5;
        }
      }

      .link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.45rem;
        min-height: 2.75rem;
        padding: 0.72rem 1rem 0.78rem;
        border-radius: 999rem;
        background-color: var(--c-nachtgroen, #203226);
        color: var(--c-creme, #f4ebcc);
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: clamp(0.82rem, 3.6vw, 0.95rem);
        font-weight: 700;
        line-height: 1;
        text-decoration: none;
        white-space: nowrap;

        @media (min-width: 48rem) {
          min-height: 2.5rem;
          padding: 0.7rem 1rem 0.76rem;
          font-size: 0.92rem;
        }

        @media (min-width: 64rem) {
          min-height: 2.45rem;
          padding: 0.68rem 1rem 0.74rem;
          font-size: 0.9rem;
        }

        @media (min-width: 90rem) {
          min-height: 2.5rem;
          padding: 0.7rem 1rem 0.76rem;
          font-size: 0.92rem;
        }

        &:focus-visible {
          outline: 0.1875rem solid var(--c-nachtgroen, #203226);
          outline-offset: 0.1875rem;
        }

        .icon {
          display: block;
          flex-shrink: 0;
          width: 1rem;
          height: 1rem;
          transform-origin: center;
          transition: transform 0.25s ease;
        }

        &:hover .icon,
        &:focus-visible .icon {
          transform: scale(1.70);
        }
      }
    }
  }

  /*
    Hero slider animations
    - The image track contains three equal slides.
    - The full cycle takes 9 seconds, so each slide gets about 3 seconds.
    - The transform moves the 300% wide track by one third each time.
    - The dot animations use the same 9 second timing, so the active dot matches the visible slide.
  */
  @keyframes hero-slide {
    /* Slide 1 stays visible at the start of the animation. */
    0%, 26% { transform: translateX(0); }

    /* Slide 2 becomes visible by moving the track one slide width to the left. */
    33%, 59% { transform: translateX(calc(-100% / 3)); }

    /* Slide 3 becomes visible by moving the track two slide widths to the left. */
    66%, 92% { transform: translateX(calc(-200% / 3)); }

    /* The track returns to slide 1 to restart the loop. */
    100% { transform: translateX(0); }
  }

  @keyframes hero-dot-one {
    /* Active while slide 1 is visible. */
    0%, 27% { width: 1.5rem; background-color: var(--c-nachtgroen, #203226); }

    /* Inactive while slide 2 and slide 3 are visible. */
    32%, 94% { width: 0.42rem; background-color: rgba(32, 50, 38, 0.45); }

    /* Active again when the slider loops back to slide 1. */
    100% { width: 1.5rem; background-color: var(--c-nachtgroen, #203226); }
  }

  @keyframes hero-dot-two {
    /* Inactive during slide 1. */
    0%, 27% { width: 0.42rem; background-color: rgba(32, 50, 38, 0.45); }

    /* Active while slide 2 is visible. */
    32%, 61% { width: 1.5rem; background-color: var(--c-nachtgroen, #203226); }

    /* Inactive during slide 3 and the loop reset. */
    66%, 100% { width: 0.42rem; background-color: rgba(32, 50, 38, 0.45); }
  }

  @keyframes hero-dot-three {
    /* Inactive during slide 1 and slide 2. */
    0%, 61% { width: 0.42rem; background-color: rgba(32, 50, 38, 0.45); }

    /* Active while slide 3 is visible. */
    66%, 94% { width: 1.5rem; background-color: var(--c-nachtgroen, #203226); }

    /* Inactive again before the loop returns to slide 1. */
    100% { width: 0.42rem; background-color: rgba(32, 50, 38, 0.45); }
  }
</style>