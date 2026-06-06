<script>
  import heroImage from '$lib/assets/test.png';
  import arrowIcon from '$lib/assets/arrow.svg';
  import dividerImage from '$lib/assets/divider.svg';
  import { QuranVerseSection, InstagramWidget, BukhariHadithSection, BlogSection } from '$lib';
</script>

<section class="home-hero">
  <div class="hero-card">
    <img src={dividerImage} alt="" class="divider" />

    <div class="visual">
      <div class="media">
        <ul class="track">
          <li><img src={heroImage} alt="Meydandaki cami" /></li>
          <li><img src={heroImage} alt="Meydandaki cami" /></li>
          <li><img src={heroImage} alt="Meydandaki cami" /></li>
        </ul>
      </div>

      <div class="slider-nav">
        <p class="sr-only">Öne çıkan görseller</p>

        <ol class="dot-list">
          <li><span class="dot"></span></li>
          <li><span class="dot"></span></li>
          <li><span class="dot"></span></li>
        </ol>
      </div>
    </div>

    <div class="content">
      <h1>Toplum için atan bir kalp</h1>
      <p>
        Masa kahve telefon dağ şeker armut saat çiçek orman, bulut, kuş tarla çay ayna?
        Çiçek yıldız gökyüzü mobilya saat tarla kuş dağ elma armut, kaşık, ev defter hava.
      </p>

      <a href="/hakkimizda" class="link">
        <span>Daha fazla oku</span>
        <img src={arrowIcon} alt="" class="icon" />
      </a>
    </div>
  </div>
</section>

<QuranVerseSection />

<BlogSection />

<BukhariHadithSection />

<InstagramWidget />

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

  .home-hero {
    width: 100%;
    padding-block-start: 5rem;
    background-color: var(--c-nachtgroen, #203226);
    overflow-x: hidden;

    @media (min-width: 768px) { padding: 9.5rem 0 0; }
    @media (min-width: 1024px) { padding-block-start: 9rem; }
    @media (min-width: 1440px) { padding-block-start: 9.25rem; }
  }

  .hero-card {
    position: relative;
    width: 100%;
    background-color: var(--c-creme, #f4ebcc);

    @media (min-width: 768px) {
      display: grid;
      grid-template-columns: minmax(0, 20rem) minmax(0, 18rem);
      grid-template-areas: "content visual";
      align-items: center;
      justify-content: center;
      column-gap: clamp(2.5rem, 6vw, 4rem);
      min-height: 21rem;
      padding: 2.5rem clamp(2rem, 7vw, 4.5rem);
    }

    @media (min-width: 1024px) {
      grid-template-columns: minmax(0, 27rem) minmax(0, 25rem);
      column-gap: clamp(4rem, 7vw, 6rem);
      min-height: 24rem;
      padding: 3rem clamp(3rem, 8vw, 6.5rem);
    }

    @media (min-width: 1440px) {
      grid-template-columns: minmax(0, 31rem) minmax(0, 27rem);
      column-gap: clamp(5rem, 8vw, 7rem);
      min-height: 25rem;
      padding: 3.25rem clamp(5rem, 9vw, 8rem);
    }

    .divider {
      display: none;

      @media (min-width: 768px) {
        position: absolute;
        display: block;
        top: -5.4rem;
        right: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        max-width: 32rem;
        height: auto;
        margin: auto; 
      }

      @media (min-width: 1024px) { top: -5rem; max-width: 40rem; }
      @media (min-width: 1440px) { max-width: 48rem; }
    }

    .visual {
      margin: 0;
      background-color: var(--c-creme, #f4ebcc);

      @media (min-width: 768px) {
        grid-area: visual;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        justify-self: center;
        width: 100%;
      }

      .media {
        width: 100%;
        overflow: hidden;
        background-color: var(--c-creme, #f4ebcc);

        @media (min-width: 768px) {
          max-width: 18rem;
          aspect-ratio: 296 / 333;
          border-radius: 0.35rem;
          box-shadow: 0 1rem 2rem rgba(32, 50, 38, 0.22);
        }

        @media (min-width: 1024px) { max-width: 24rem; }
        @media (min-width: 1440px) { max-width: 27rem; }

        .track {
          display: flex;
          width: 300%;
          margin: 0;
          padding: 0;
          list-style: none;
          /* Moves the image track horizontally to create a CSS-only carousel loop. */
          animation: hero-slide 9s infinite ease-in-out;

          @media (min-width: 768px) { height: 100%; }

          li {
            flex: 0 0 calc(100% / 3);
            width: calc(100% / 3);
          }

          img {
            display: block;
            width: 100%;
            aspect-ratio: 375 / 268;
            object-fit: cover;
            object-position: center;

            @media (min-width: 768px) {
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

        @media (min-width: 768px) {
          padding-block: 0.55rem 0;
          background-color: transparent;
        }

        .dot-list {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          margin: 0;
          padding: 0;
          list-style: none;

          li:nth-child(1) .dot { animation: hero-dot-one 9s infinite ease-in-out; }
          li:nth-child(2) .dot { animation: hero-dot-two 9s infinite ease-in-out; }
          li:nth-child(3) .dot { animation: hero-dot-three 9s infinite ease-in-out; }
        }

        .dot {
          display: block;
          width: 0.42rem;
          height: 0.42rem;
          border-radius: 999rem;
          background-color: rgba(32, 50, 38, 0.45);
          transition: width 0.45s ease, background-color 0.45s ease;
        }
      }
    }

    .content {
      padding: 0 1.7rem 3.8rem;
      background-color: var(--c-creme, #f4ebcc);

      @media (min-width: 48rem) {
        grid-area: content;
        justify-self: center;
        padding: 0;
      }

      h1 {
        max-width: 12.5rem;
        margin: 0 0 1.2rem;
        color: var(--c-nachtgroen, #203226);
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: clamp(2.25rem, 10.6vw, 2.65rem);
        font-weight: 700;
        line-height: 1.08;
        letter-spacing: -0.055em;

        @media (min-width: 425px) and (max-width: 767px) { max-width: 18rem; }

        @media (min-width: 768px) {
          max-width: 15.5rem;
          margin-block-end: 1rem;
          font-size: clamp(2rem, 3.9vw, 2.45rem);
        }

        @media (min-width: 1024px) {
          max-width: 21rem;
          font-size: clamp(2.75rem, 3.6vw, 3.5rem);
          line-height: 1.05;
        }

        @media (min-width: 1440px) {
          max-width: 22rem;
          margin-block-end: 1rem;
          font-size: clamp(3rem, 3.5vw, 3.65rem);
          line-height: 1.04;
        }
      }

      p {
        max-width: 18.9rem;
        margin: 0 0 1.25rem;
        color: var(--c-nachtgroen, #203226);
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.55;
        letter-spacing: -0.035em;

        @media (min-width: 768px) {
          max-width: 22rem;
          font-size: clamp(0.86rem, 1.45vw, 0.95rem);
          line-height: 1.5;
        }

        @media (min-width: 1024px) {
          max-width: 29rem;
          margin-block-end: 1.55rem;
          font-size: 1rem;
          line-height: 1.55;
         }

        @media (min-width: 1440px) {
          max-width: 32rem;
          margin-block-end: 1.65rem;
          font-size: 1.02rem;
          line-height: 1.55;
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

        @media (min-width: 768px) { min-height: 2.5rem; padding: 0.7rem 1rem 0.76rem; font-size: 0.92rem; }
        @media (min-width: 1024px) { min-height: 2.45rem; padding: 0.68rem 1rem 0.74rem; font-size: 0.9rem; }

        &:focus-visible {
          outline: 0.1875rem solid var(--c-nachtgroen, #203226);
          outline-offset: 0.1875rem;
        }

        &:hover .icon,
        &:focus-visible .icon {
          transform: scale(1.7);
        }

        .icon {
          display: block;
          flex-shrink: 0;
          width: 1rem;
          height: 1rem;
          transform-origin: center;
          transition: transform 0.25s ease;
        }
      }
    }
  }

  /* Carousel movement: each slide stays visible for a short moment before the track shifts to the next image. */
  @keyframes hero-slide {
    0%, 26% { transform: translateX(0); }
    33%, 59% { transform: translateX(calc(-100% / 3)); }
    66%, 92% { transform: translateX(calc(-200% / 3)); }
    100% { transform: translateX(0); }
  }

  /* Dot state animations: the active dot stretches into a pill while inactive dots stay circular. */
  @keyframes hero-dot-one {
    0%, 27% { width: 1.5rem; background-color: var(--c-nachtgroen, #203226); }
    32%, 94% { width: 0.42rem; background-color: rgba(32, 50, 38, 0.45); }
    100% { width: 1.5rem; background-color: var(--c-nachtgroen, #203226); }
  }

  @keyframes hero-dot-two {
    0%, 27% { width: 0.42rem; background-color: rgba(32, 50, 38, 0.45); }
    32%, 61% { width: 1.5rem; background-color: var(--c-nachtgroen, #203226); }
    66%, 100% { width: 0.42rem; background-color: rgba(32, 50, 38, 0.45); }
  }

  @keyframes hero-dot-three {
    0%, 61% { width: 0.42rem; background-color: rgba(32, 50, 38, 0.45); }
    66%, 94% { width: 1.5rem; background-color: var(--c-nachtgroen, #203226); }
    100% { width: 0.42rem; background-color: rgba(32, 50, 38, 0.45); }
  }
</style>
