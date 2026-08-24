<script>
  import { HeroSection, QuranVerseSection, InstagramWidget, BukhariHadithSection, BlogSection } from '$lib';
</script>

<HeroSection />

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
</style>
