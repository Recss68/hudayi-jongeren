<script>
  import instagramIcon from '$lib/assets/Icon.svg';
  import locationIcon from '$lib/assets/location.svg';
  import mailIcon from '$lib/assets/mail.svg';
</script>

<footer class="site-footer">
  <div class="site-footer__inner">
    <section class="site-footer__brand">
      <h3 class="site-footer__title">Hüdayi Gençlik</h3>
      <p class="site-footer__tagline">
        Gençler için bir yuva — inançla köklenen, toplulukla güçlenen.
      </p>
    </section>

    <nav class="site-footer__navigation">
      <h3 class="heading">Navigasyon</h3>

      <ul class="site-footer__list">
        <li class="site-footer__item">
          <a class="site-footer__link" href="/">Ana Sayfa</a>
        </li>
        <li class="site-footer__item">
          <a class="site-footer__link" href="/blog">Blog</a>
        </li>
        <li class="site-footer__item">
          <a class="site-footer__link" href="/over-ons">Hakkımızda</a>
        </li>
        <li class="site-footer__item">
          <a class="site-footer__link" href="/activiteiten">Etkinlikler</a>
        </li>
        <li class="site-footer__item">
          <a class="site-footer__link" href="/contact">İletişim</a>
        </li>
        <li class="site-footer__item">
          <a class="site-footer__link" href="/doneren">Bağış Yap</a>
        </li>
      </ul>
    </nav>

    <section class="site-footer__contact">
      <h3 class="heading">İletişim</h3>

      <address class="site-footer__address">
        <span class="site-footer__contact-row">
          <img src={locationIcon} alt="" class="site-footer__icon" />
          <span>Voorbeeldstraat 12, 3000 AB Rotterdam</span>
        </span>

        <span class="site-footer__contact-row">
          <img src={mailIcon} alt="" class="site-footer__icon" />
          <a class="site-footer__link" href="mailto:info@hudayigenclik.nl">
            info@hudayigenclik.nl
          </a>
        </span>
      </address>

      <ul class="site-footer__socials">
        <li class="site-footer__social-item">
          <a class="site-footer__social-link" href="https://www.instagram.com/">
            <img src={instagramIcon} alt="Instagram" class="site-footer__social-icon" />
          </a>
        </li>
      </ul>

      <a class="site-footer__donation-link" href="/doneren">Word donateur</a>
    </section>
  </div>

  <div class="site-footer__bottom">
    <p>© 2026 Hüdayi Gençlik · Tüm hakları saklıdır</p>
  </div>
</footer>

<style>
  .site-footer {
    color: var(--c-creme, var(--c-creme-hex));
  }

  .site-footer__inner {
    display: grid;
    gap: 3.25rem;
    padding: 3.5rem 1.5rem 2.5rem;
  }

  .site-footer__brand,
  .site-footer__navigation,
  .site-footer__contact {
    display: grid;
    gap: 1.5rem;
  }

  .site-footer__title,
  .heading,
  .site-footer__tagline,
  .site-footer__list,
  .site-footer__address,
  .site-footer__socials,
  .site-footer__bottom p {
    margin: 0;
  }

  .site-footer__title {
    color: var(--c-wit, var(--c-wit-hex));
    font-family: var(--font-primary);
    font-size: 1.25rem;
    font-weight: var(--fw-semibold);
    line-height: 1.2;
  }

  .site-footer__tagline {
    max-width: 18rem;
    font-family: var(--font-primary);
    font-size: 0.95rem;
    font-weight: var(--fw-regular);
    line-height: 1.55;
  }

  .heading {
    color: var(--c-wit, var(--c-wit-hex));
    font-family: var(--font-primary);
    font-size: 0.8rem;
    font-weight: var(--fw-bold);
    line-height: 1.2;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .site-footer__list,
  .site-footer__socials {
    display: grid;
    gap: 1.15rem;
    padding: 0;
    list-style: none;
  }

  .site-footer__link {
    color: inherit;
    font-family: var(--font-primary);
    font-size: 0.95rem;
    line-height: 1.35;
    text-decoration: none;
  }

  .site-footer__link:focus-visible,
  .site-footer__social-link:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 0.25rem;
  }

  .site-footer__address {
    display: grid;
    gap: 1.15rem;
    font-style: normal;
  }

  .site-footer__contact-row {
    display: grid;
    grid-template-columns: 1rem 1fr;
    gap: 0.75rem;
    align-items: start;
    font-family: var(--font-primary);
    font-size: 0.95rem;
    line-height: 1.4;
  }

  .site-footer__icon {
    width: 1rem;
    height: 1rem;
    margin-top: 0.15rem;
  }

  .site-footer__socials {
    margin-top: 0.25rem;
    display: flex;
    align-items: center;
  }

  .site-footer__social-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 999px;
    background-color: rgb(247 225 199 / 0.1);
    color: var(--c-creme, var(--c-creme-hex));
    text-decoration: none;
  }

  .site-footer__donation-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    justify-self: start;
    min-height: 3.25rem;
    margin-top: 1rem;
    padding: 0 1.75rem;
    border: 1.5px solid currentColor;
    border-radius: 999px;
    color: var(--c-creme, var(--c-creme-hex));
    font-family: var(--font-primary);
    font-size: 0.95rem;
    font-weight: var(--fw-bold);
    line-height: 1;
    text-decoration: none;
  }

  .site-footer__donation-link:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 0.25rem;
  }

  .site-footer__social-icon {
    width: 1.1rem;
    height: 1.1rem;
  }

  .site-footer__bottom {
    margin: 0 1.25rem;
    padding: 1.25rem 0 1.5rem;
    border-top: 1px solid rgb(244 235 204 / 0.65);
  }

  .site-footer__bottom p {
    max-width: 18rem;
    font-family: var(--font-primary);
    font-size: 0.85rem;
    line-height: 1.45;
  }
</style>