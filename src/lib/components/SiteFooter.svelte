<script>
  import instagramIcon from '$lib/assets/Icon.svg';
  import locationIcon from '$lib/assets/location.svg';
  import mailIcon from '$lib/assets/mail.svg';
  import * as m from '$lib/paraglide/messages';
</script>

<footer class="footer">
  <div class="inner">
    <section class="brand">
      <h3 class="title">{m.footer_brand_title()}</h3>
      <p class="tagline">
        {m.footer_tagline()}
      </p>
    </section>

    <nav class="navigation">
      <h3 class="heading">{m.footer_navigation_heading()}</h3>

      <ul class="list">
        <li>
          <a class="link" href="/">{m.footer_home()}</a>
        </li>
        <li>
          <a class="link" href="/blog">{m.footer_blog()}</a>
        </li>
        <li>
          <a class="link" href="/over-ons">Hakkımızda</a>
        </li>
        <li>
          <a class="link" href="/activiteiten">Etkinlikler</a>
        </li>
        <li>
          <a class="link" href="/contact">{m.footer_contact()}</a>
        </li>
        <li>
          <a class="link" href="/doneren">Bağış Yap</a>
        </li>
      </ul>
    </nav>

    <section class="contact">
      <h3 class="heading">{m.footer_contact_heading()}</h3>

      <address class="address">
        <span class="contact-row">
          <img src={locationIcon} alt="" class="icon" />
          <span>Voorbeeldstraat 12, 3000 AB Rotterdam</span>
        </span>

        <span class="contact-row">
          <img src={mailIcon} alt="" class="icon" />
          <a class="link" href="mailto:info@hudayigenclik.nl">
            info@hudayigenclik.nl
          </a>
        </span>
      </address>

      <ul class="socials">
        <li>
          <a class="social-link" href="https://www.instagram.com/">
            <img src={instagramIcon} alt="Instagram" class="social-icon" />
          </a>
        </li>
      </ul>
    </section>
  </div>

  <div class="bottom">
    <p>{m.footer_copyright()}</p>
    <a class="donation-link" href="/doneren">Word donateur</a>
  </div>
</footer>

<style>
  .footer {
    color: var(--c-creme, var(--c-creme-hex));
  }

  .inner {
    display: grid;
    gap: 3.25rem;
    padding: 3.5rem 1.5rem 2.5rem;
  }

  .brand,
  .navigation,
  .contact {
    display: grid;
    gap: 1.5rem;
  }

  .title,
  .heading,
  .tagline,
  .list,
  .address,
  .socials,
  .bottom p {
    margin: 0;
  }

  .title {
    color: var(--c-wit, var(--c-wit-hex));
    font-family: var(--font-primary);
    font-size: 1.25rem;
    font-weight: var(--fw-semibold);
    line-height: 1.2;
  }

  .tagline {
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

  .list {
    display: grid;
    gap: 1.15rem;
    padding: 0;
    list-style: none;
  }

  .link {
    position: relative;
    color: inherit;
    font-family: var(--font-primary);
    font-size: 0.95rem;
    line-height: 1.35;
    text-decoration: none;
  }

  .link:focus-visible,
  .social-link:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 0.25rem;
  }

  .address {
    display: grid;
    gap: 1.15rem;
    font-style: normal;
  }

  .contact-row {
    display: grid;
    grid-template-columns: 1rem 1fr;
    gap: 0.75rem;
    align-items: start;
    font-family: var(--font-primary);
    font-size: 0.95rem;
    line-height: 1.4;
  }

  .icon {
    width: 1rem;
    height: 1rem;
    margin-top: 0.15rem;
  }

  .socials {
    display: flex;
    align-items: center;
    gap: 1.15rem;
    margin-top: 0.25rem;
    padding: 0;
    list-style: none;
  }

  .social-link {
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

  .donation-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    justify-self: start;
    min-height: 3.25rem;
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

  .donation-link:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 0.25rem;
  }

  .social-icon {
    width: 1.1rem;
    height: 1.1rem;
  }

  .bottom {
    display: grid;
    gap: 1.5rem;
    margin: 0 1.5rem;
    padding: 1.5rem 0 2rem;
    border-top: 1px solid rgb(244 235 204 / 0.65);
  }

  .bottom p {
    max-width: 18rem;
    font-family: var(--font-primary);
    font-size: 0.85rem;
    line-height: 1.45;
  }

  @media (min-width: 768px) {
    .inner {
      grid-template-columns: 1.25fr 0.75fr 1fr;
      gap: 4rem;
      max-width: var(--container-max);
      margin: 0 auto;
      padding: 4.5rem var(--container-pad) 3.5rem;
    }

    .brand,
    .navigation,
    .contact {
      align-content: start;
    }

    .tagline {
      max-width: 16rem;
    }

    .contact-row {
      grid-template-columns: 1rem minmax(0, 1fr);
    }

    .bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      margin: 0 var(--container-pad);
      padding: 2rem 0 3.5rem;
    }

    @media (min-width: 1024px) {
      .inner {
        max-width: none;
        padding-inline: clamp(1rem, 2vw, 2rem);
      }

      .bottom {
        margin-inline: clamp(1rem, 2vw, 2rem);
      }

      .navigation .link::after {
        position: absolute;
        left: 0;
        bottom: -0.375rem;
        width: 100%;
        height: 0.125rem;
        border-radius: 9999px;
        background-color: currentColor;
        content: '';
        transform: scaleX(0);
        transform-origin: center;
        transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .navigation .link:hover::after,
      .navigation .link:focus-visible::after {
        transform: scaleX(1);
      }

      .social-link {
        transition:
          background-color 180ms ease,
          transform 180ms ease;
      }

      .social-link:hover,
      .social-link:focus-visible {
        background-color: rgb(247 225 199 / 0.18);
        transform: translateY(-2px);
      }

      .donation-link {
        transition:
          background-color 180ms ease,
          color 180ms ease;
      }

      .donation-link:hover,
      .donation-link:focus-visible {
        background-color: var(--c-creme, var(--c-creme-hex));
        color: var(--c-nachtgroen, var(--c-nachtgroen-hex));
      }
    }
  }
</style>