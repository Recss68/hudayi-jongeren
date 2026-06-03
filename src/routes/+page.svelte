<script>
  import heroImage from '$lib/assets/test.png';
  import arrowIcon from '$lib/assets/arrow.svg';
</script>

<section class="hero-section">
  <div class="hero-media">
    <img src={heroImage} alt="Moskee aan een plein" class="hero-image" />
  </div>

  <div class="hero-content">
    <h1>Een hart voor de gemeenschap</h1>

    <p>
      Hüdayi Gençlik is een stichting die zich inzet voor de spirituele en persoonlijke
      groei van jongeren. Wij geloven in de kracht van educatie, broederschap en
      maatschappelijke betrokkenheid als fundament voor een harmonieuze samenleving.
    </p>

    <a href="/over-ons" class="hero-link">
      <span>Lees meer</span>
      <img src={arrowIcon} alt="" class="hero-link-icon" />
    </a>
  </div>
</section>
