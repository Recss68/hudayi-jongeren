<script>
  import Hero from '$lib/components/ui/HeroSection.svelte';
  import { QuranVerseSection, InstagramWidget, BukhariHadithSection, BlogSection } from '$lib';
	import HeroSection from '$lib/components/ui/HeroSection.svelte';
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
