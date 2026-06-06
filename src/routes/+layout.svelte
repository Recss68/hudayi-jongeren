<script>
	import '$lib/styles/hj-styles.css';
	import Header from '$lib/components/header.svelte';
	import HadithSection from '$lib/components/ui/BukhariHadithSection.svelte';
	import Footer from '$lib/components/SiteFooter.svelte';

	let { children } = $props();
</script>

<Header />

<main>
	{@render children()}
	<HadithSection />
</main>

<Footer />
