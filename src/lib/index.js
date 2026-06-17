// place files you want to import through the `$lib` alias in this folder.

// Layout
export { default as Header } from './components/Layout/Header.svelte';
export { default as Footer } from './components/Layout/Footer.svelte';

// UI
export { default as QuranVerseSection } from './components/ui/QuranVerseSection.svelte';
export { default as HadithSection } from './components/ui/HadithSection.svelte';
export { default as InstagramWidget } from './components/ui/InstagramWidget.svelte';
export { default as BlogSection } from './components/ui/BlogSection.svelte';

// Data
export { default as Verses } from './data/quran-verses.json';
export { default as BukhariHadiths } from './data/bukhari-hadiths.json';
export { default as DummyArticles } from './data/dummy-articles.json';
