<script>
  import hamburgerIcon from '$lib/assets/hamburger.svg';
  import crossIcon from '$lib/assets/cross.svg';
  import heartIcon from '$lib/assets/heart.svg';
  import turkiyeFlag from '$lib/assets/turkiye.svg';
  import chevronIcon from '$lib/assets/vector.svg';
</script>

<header class="site-header">
  <nav class="header-nav">
    <div class="menu-wrapper">
      <input type="checkbox" id="menu-toggle-checkbox" class="sr-only menu-checkbox" />

      <label for="menu-toggle-checkbox" class="menu-toggle-btn">
        <span class="sr-only">Menu openen of sluiten</span>
        <img src={hamburgerIcon} alt="" class="menu-icon menu-icon--hamburger" />
        <img src={crossIcon} alt="" class="menu-icon menu-icon--cross" />
      </label>

      <label for="menu-toggle-checkbox" class="menu-overlay">
        <span class="sr-only">Menu sluiten</span>
      </label>

      <div class="menu-panel">
        <ul class="menu-list">
          <li><a href="/">Ana Sayfa</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/doneren">Online bağış</a></li>
        </ul>
      </div>
    </div>

    <a href="/doneren" class="donation-link">
      <span>Online bağış</span>
      <img src={heartIcon} alt="" class="heart-icon" />
    </a>

    <a href="/tr" class="language-link">
      <img src={turkiyeFlag} alt="" class="flag-icon" />
      <span class="sr-only">Turkish</span>
      <img src={chevronIcon} alt="" class="chevron-icon" />
    </a>
  </nav>
</header>

<style>
  .site-header {
    position: relative;
    width: 100%;
    background-color: var(--c-nachtgroen);

    .header-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      max-width: var(--container-max);
      margin: 0 auto;
      padding: var(--space-4) var(--container-pad);
    }
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

  .menu-wrapper {
    position: static;
    display: flex;
    align-items: center;
    flex-shrink: 0;

    .menu-checkbox:checked {
      ~ .menu-toggle-btn {
        .menu-icon--hamburger {
          opacity: 0;
          transform: scale(0.5) rotate(90deg);
        }

        .menu-icon--cross {
          opacity: 1;
          transform: scale(0.78) rotate(0deg);
        }
      }

      ~ .menu-overlay {
        opacity: 1;
        visibility: visible;
        backdrop-filter: blur(3px);
        transition-delay: 0s;
      }

      ~ .menu-panel {
        visibility: visible;
        opacity: 1;
        transform: translateX(0) scale(1);
        transition-delay: 0s;

        .menu-list {
          li {
            opacity: 1;
            transform: translateX(0);
          }

          li:nth-child(1) {
            transition-delay: 0.12s;
          }

          li:nth-child(2) {
            transition-delay: 0.18s;
          }

          li:nth-child(3) {
            transition-delay: 0.24s;
          }

          li:nth-child(4) {
            transition-delay: 0.3s;
          }
        }
      }
    }
  }

  .menu-toggle-btn {
    position: relative;
    z-index: 40;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    padding: 0;
    cursor: pointer;
    background: transparent;
    transition: transform 0.2s ease;
    -webkit-tap-highlight-color: transparent;

    &:active {
      transform: scale(0.92);
    }

    .menu-icon {
      position: absolute;
      inset: 0;
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
      transition:
        opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: center;
    }

    .menu-icon--hamburger {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }

    .menu-icon--cross {
      opacity: 0;
      pointer-events: none;
      transform: scale(0.42) rotate(-90deg);
    }
  }

  .menu-overlay {
    position: fixed;
    inset: 0;
    z-index: 20;
    opacity: 0;
    visibility: hidden;
    background-color: rgb(0 0 0 / 36%);
    backdrop-filter: blur(0);
    cursor: default;
    transition:
      opacity 0.34s ease,
      backdrop-filter 0.34s ease,
      visibility 0s 0.34s;
  }

  .menu-panel {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 30;
    width: min(84vw, 21rem);
    height: 100vh;
    padding: 6rem 1rem 1rem;
    overflow-y: auto;
    visibility: hidden;
    opacity: 0;
    background-color: var(--c-creme);
    box-shadow: 0 18px 48px rgb(0 0 0 / 24%);
    transform: translateX(-105%) scale(0.96);
    transform-origin: left center;
    transition:
      transform 0.48s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.28s ease,
      visibility 0s 0.48s;
    will-change: transform, opacity;

    .menu-list {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        opacity: 0;
        transform: translateX(-1.25rem);
        transition:
          opacity 0.36s ease,
          transform 0.46s cubic-bezier(0.16, 1, 0.3, 1);
      }

      a {
        display: block;
        padding: 1rem 1.25rem;
        border-radius: 0.75rem;
        color: var(--c-nachtgroen);
        text-decoration: none;
        font-family: var(--font-primary);
        font-size: 1.5rem;
        font-weight: var(--fw-semibold);
        transition:
          background-color 0.2s ease,
          transform 0.2s ease;

        &:hover,
        &:focus-visible {
          outline: none;
          background-color: rgb(0 0 0 / 6%);
        }

        &:active {
          transform: translateX(4px);
        }
      }
    }
  }

  .donation-link {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    border: none;
    border-radius: 9999px;
    background-color: var(--c-creme);
    color: var(--c-nachtgroen);
    text-decoration: none;
    font-family: var(--font-primary);
    font-size: 0.875rem;
    font-weight: var(--fw-bold);
    letter-spacing: -0.01em;
    white-space: nowrap;
    transition: transform 0.2s ease;

    &:active {
      transform: scale(0.95);
    }

    .heart-icon {
      width: auto;
      height: 16px;
    }
  }

  .language-link {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    gap: var(--space-1);
    padding: 4px 8px 4px 4px;
    border: none;
    border-radius: 9999px;
    background-color: var(--c-creme);
    text-decoration: none;
    transition: transform 0.2s ease;

    &:active {
      transform: scale(0.95);
    }

    .flag-icon {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      object-fit: cover;
    }

    .chevron-icon {
      width: auto;
      height: 8px;
      margin-right: 4px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .menu-toggle-btn,
    .menu-icon,
    .menu-overlay,
    .menu-panel,
    .menu-list li,
    .menu-list a,
    .donation-link,
    .language-link {
      transition-duration: 0.01ms;
      transition-delay: 0s;
    }
  }
</style>