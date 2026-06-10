<script>
	import '$lib/styles/hj-styles.css';
	import { Header, Footer } from '$lib';

	let { children } = $props();
</script>

<Header />

<main>
	{@render children()}
</main>

<Footer />
