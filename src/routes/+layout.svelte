<script>
  import '$lib/styles/hj-styles.css';
  import Header from '$lib/components/header.svelte';

  let { children } = $props();

</script>

<Header />

<main>  
	{@render children()}
</main>