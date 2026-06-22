<script>
  import heroImage from '$lib/assets/test.png';
  import arrowIcon from '$lib/assets/arrow.svg';
  import dividerImage from '$lib/assets/divider.svg';
  import { page } from '$app/state';
  import * as m from '$lib/paraglide/messages';

  const supportedLocales = ['nl', 'en', 'tr'];

  const activeLocale = $derived.by(() => {
    const locale = page.url.pathname.split('/')[1];

    if (supportedLocales.includes(locale)) {
      return locale;
    }

    return 'tr';
  });

  const heroImageAlt = $derived(m.home_hero_image_alt({}, { locale: activeLocale }));
  const heroTitle = $derived(m.home_hero_title({}, { locale: activeLocale }));
  const heroDescription = $derived(m.home_hero_description({}, { locale: activeLocale }));
  const heroReadMore = $derived(m.home_hero_read_more({}, { locale: activeLocale }));
  const heroLink = $derived(`/${activeLocale}/hakkimizda`);
</script>

<section class="home-hero">
  <div class="hero-card">
    <img src={dividerImage} alt="" class="divider" />

    <figure class="visual">
      <img src={heroImage} alt={heroImageAlt} class="hero-image" />
    </figure>

    <div class="content">
      <h1>{heroTitle}</h1>

      <p>{heroDescription}</p>

      <a href={heroLink} class="link">
        <span>{heroReadMore}</span>
        <img src={arrowIcon} alt="" class="icon" />
      </a>
    </div>
  </div>
</section>
