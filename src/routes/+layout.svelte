<script>
	import '$lib/styles/hj-styles.css';
	import { onNavigate } from '$app/navigation';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/SiteFooter.svelte';

	let { children } = $props();

	// Progressive enhancement: cross-fade route changes (e.g. language switches) natively.
	onNavigate((navigation) => {
		if (!document.startViewTransition) {
			return;
		}

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<Header />

<main>
	{@render children()}
</main>

<Footer />
